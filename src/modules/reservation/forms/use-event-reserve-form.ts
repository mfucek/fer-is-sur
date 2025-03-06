import { api } from '@/deps/trpc/react';
import { useDebouncedEffect } from '@/utils/use-debounced-effect';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
	eventReserveSchema,
	type TEventReserveSchema
} from '../schemas/event-reserve-schema';

export const useEventReserveForm = (
	eventId: string,
	remainingSlots: number,
	onReservationSubmit: (reservationId: string) => void
) => {
	// React Hook Form
	const form = useForm<TEventReserveSchema>({
		resolver: zodResolver(
			eventReserveSchema.extend({
				quantity: z
					.number()
					.min(1)
					.max(
						remainingSlots,
						remainingSlots === 0
							? 'Nema više slobodnih mjesta.'
							: `Ima samo ${remainingSlots} slobodnih mjesta.`
					)
			})
		),
		defaultValues: {
			email: '',
			couponCode: '',
			quantity: 1
		}
	});
	const { watch, handleSubmit } = form;

	const [globalError, setGlobalError] = useState<string | null>(null);

	// TRPC
	const {
		mutateAsync: reserve,
		isPending,
		error
	} = api.reservation.reserve.useMutation();
	const utils = api.useUtils();

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
			const reservation = await reserve({
				eventId,
				details: {
					email: data.email,
					couponCode: data.couponCode,
					quantity: data.quantity
				}
			});
			onReservationSubmit(reservation.id);
		} catch (e) {}
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
		globalError: error?.message
	};
};
