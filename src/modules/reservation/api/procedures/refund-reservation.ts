import { z } from 'zod';

import { refundPayment } from '@/deps/stripe/api/helpers';
import { authedProcedure } from '@/deps/trpc/procedures';
import { TRPCError } from '@trpc/server';

export const refundReservationProcedure = authedProcedure
	.input(
		z.object({
			reservationId: z.string()
		})
	)
	.mutation(async ({ ctx, input }) => {
		const { db } = ctx;
		const { reservationId } = input;

		const reservation = await db.reservation.findUnique({
			where: {
				id: reservationId
			}
		});

		if (!reservation) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Reservation not found.'
			});
		}

		if (reservation.reservationStatus !== 'CONFIRMED') {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Reservation is not confirmed.'
			});
		}

		if (reservation.paymentStatus !== 'PAID') {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Reservation is not paid.'
			});
		}

		if (!reservation.paymentIntentId) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Reservation has no payment intent ID.'
			});
		}

		if (reservation.paymentIntentId) {
			await refundPayment(reservation.paymentIntentId, reservation.totalPrice);
		}

		await db.reservation.update({
			where: {
				id: reservationId
			},
			data: {
				reservationStatus: 'CANCELLED',
				paymentStatus: 'REFUNDED'
			}
		});
	});
