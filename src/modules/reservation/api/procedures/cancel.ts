import { refundPayment } from '@/deps/stripe/api/helpers/refund-payment';
import { publicProcedure } from '@/deps/trpc/procedures';
import { sendReservationCancelledMail } from '@/modules/mailer/api/helpers/send-reservation-cancelled-mail';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const cancelProcedure = publicProcedure
	.input(z.object({ reservationId: z.string() }))
	.mutation(async ({ ctx, input }) => {
		const { reservationId } = input;
		const { db } = ctx;

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
				message: 'Reservation not found'
			});
		}

		if (reservation.reservationStatus === 'CANCELLED') {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Reservation already cancelled'
			});
		}

		if (reservation.paymentStatus === 'PAID' && reservation.paymentIntentId) {
			await refundPayment(reservation.paymentIntentId, reservation.totalPrice);
			await sendReservationCancelledMail(reservation, reservation.Event);

			await db.reservation.update({
				where: {
					id: reservationId
				},
				data: {
					reservationStatus: 'CANCELLED',
					paymentStatus: 'REFUNDED'
				}
			});
		} else {
			await db.reservation.update({
				where: {
					id: reservationId
				},
				data: {
					reservationStatus: 'CANCELLED'
				}
			});
		}

		return {
			success: true
		};
	});
