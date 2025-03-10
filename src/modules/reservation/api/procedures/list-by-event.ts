import { z } from 'zod';

import { publicProcedure } from '@/deps/trpc/procedures';

export const listByEventProcedure = publicProcedure
	.input(
		z.object({
			eventId: z.string()
		})
	)
	.query(async ({ ctx, input }) => {
		const { db } = ctx;

		const reservationsRaw = await db.reservation.findMany({
			where: { eventId: input.eventId },
			include: {
				Coupon: true
			}
		});

		const reservations = reservationsRaw.map((reservation) => ({
			id: reservation.id,
			email: reservation.email,
			quantity: reservation.quantity,
			totalPrice: reservation.totalPrice,
			reservationStatus: reservation.reservationStatus,
			paymentStatus: reservation.paymentStatus,
			coupon: reservation.Coupon
		}));

		return reservations;
	});

export type ReservationByEvent = Awaited<
	ReturnType<typeof listByEventProcedure>
>[number];
