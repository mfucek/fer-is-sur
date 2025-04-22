import { refundPayment } from '@/deps/stripe/api/helpers';
import { publicProcedure } from '@/deps/trpc/procedures';
import { sendCancellationMail } from '@/modules/mailer/api/helpers/send-cancellation-mail';
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

		if (reservation.paymentStatus === 'PAID' && reservation.paymentIntentId) {
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
