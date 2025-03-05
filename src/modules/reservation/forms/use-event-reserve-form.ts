import { api } from '@/deps/trpc/react';
import { useDebouncedEffect } from '@/utils/use-debounced-effect';
import { zodResolver } from '@hookform/resolvers/zod';
import { TRPCError } from '@trpc/server';
import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import {
	eventReserveSchema,
	type TEventReserveSchema
} from '../schemas/event-reserve-schema';

export const useEventReserveForm = (eventId: string) => {
	// React Hook Form
	const form = useForm<TEventReserveSchema>({
		resolver: zodResolver(eventReserveSchema),
		defaultValues: {
			email: '',
			couponCode: ''
		}
	});
	const { watch, handleSubmit } = form;

	const [globalError, setGlobalError] = useState<string | null>(null);

	// TRPC
	const { mutateAsync: reserve, isPending } =
		api.reservation.reserve.useMutation();

	// Coupon checking
	const { mutateAsync: checkCoupon } = api.coupon.checkCoupon.useMutation();

	const [isCouponValid, setIsCouponValid] = useState<boolean | null>(null);

	useDebouncedEffect(
		async () => {
			const code = watch('couponCode');

			if (!code) {
				setIsCouponValid(null);
				return;
			}

			const isValid = await checkCoupon({ couponCode: code });
			setIsCouponValid(isValid);
		},
		[watch('couponCode')],
		1000
	);

	// Form submission
	const onValid: SubmitHandler<TEventReserveSchema> = async (data) => {
		try {
			await reserve({
				eventId,
				details: { email: data.email, couponCode: data.couponCode }
			});
		} catch (error) {
			if (error instanceof TRPCError) {
				setGlobalError(error.message);
			}
		}
	};

	const onInvalid: SubmitErrorHandler<TEventReserveSchema> = (errors) => {
		console.log(errors);
	};

	const handleFormSubmit = handleSubmit(onValid, onInvalid);

	const submitDisabled = isCouponValid === false;

	return {
		form,
		handleFormSubmit,
		submitDisabled,
		isCouponValid,
		globalError
	};
};
