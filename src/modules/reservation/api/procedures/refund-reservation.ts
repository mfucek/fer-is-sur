import { z } from 'zod';

import { refundPayment } from '@/deps/stripe/api/helpers';
import { authedProcedure } from '@/deps/trpc/procedures';
import { sendCancellationMail } from '@/modules/mailer/api/helpers/send-cancellation-mail';
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
			},
			include: {
				Event: true
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

		await refundPayment(reservation.paymentIntentId, reservation.totalPrice);

		await sendCancellationMail(reservation, reservation.Event);

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
