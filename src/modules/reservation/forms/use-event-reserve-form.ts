import { api } from '@/deps/trpc/react';
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
	const { mutateAsync: reserve } = api.reservation.create.useMutation();
	// TODO: Implement coupon check in the new couponRouter and update this hook accordingly.
	// For now, comment out coupon check logic and set isCouponValid to null by default.
	// const { mutateAsync: checkCoupon } = api.coupon.check.useMutation
	//   ? api.coupon.check.useMutation()
	//   : { mutateAsync: async () => true };
	const [isCouponValid, setIsCouponValid] = useState<boolean | null>(null);

	// Form submission
	const onValid: SubmitHandler<TEventReserveSchema> = async (data) => {
		try {
			const reservation = await reserve({
				eventId,
				email: data.email,
				couponId: undefined, // Add coupon logic if needed
				quantity: data.quantity,
				totalPrice: 0, // Calculate price as needed
				reservationStatus: 'PENDING',
				paymentStatus: 'NOT_PAID',
				paymentIntentId: undefined
			});
			onReservationSubmit(reservation.id);
		} catch (e) {}
	};

	const onInvalid: SubmitErrorHandler<TEventReserveSchema> = (errors) => {
		console.log(errors);
	};

	const handleFormSubmit = form.handleSubmit(onValid, onInvalid);

	const submitDisabled = isCouponValid === false;

	return {
		form,
		handleFormSubmit,
		submitDisabled,
		isCouponValid,
		globalError: null
	};
};
