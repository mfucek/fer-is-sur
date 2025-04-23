import { addMonths, subMonths } from 'date-fns';
import { z } from 'zod';

import { publicProcedure } from '@/deps/trpc/procedures';

export const getEventDatesProcedure = publicProcedure
	.input(z.object({ monthDate: z.number() }))
	.mutation(async ({ ctx, input }) => {
		// month previous to the given date's month
		const dateFrom = subMonths(input.monthDate, 1);
		const dateTo = addMonths(input.monthDate, 1);

		const eventsRaw = await ctx.db.event.findMany({
			where: {
				date: { gte: dateFrom, lte: dateTo }
			},
			include: {
				Reservations: true
			}
		});

		const events = eventsRaw.map((eventRaw) => {
			const occupiedSlots = eventRaw.Reservations.filter(
				(reservation) => reservation.reservationStatus === 'CONFIRMED'
			).reduce((acc, reservation) => acc + reservation.quantity, 0);

			return {
				id: eventRaw.id,
				createdAt: eventRaw.createdAt,
				updatedAt: eventRaw.updatedAt,
				date: eventRaw.date,
				location: eventRaw.location,
				title: eventRaw.title,
				description: eventRaw.description,
				capacity: eventRaw.capacity,
				price: eventRaw.price / 100,
				externalReservationUrl: eventRaw.externalReservationUrl,
				remainingSlots: eventRaw.capacity - occupiedSlots
			};
		});

		return events;
	});

export type EventDateDTO = Awaited<
	ReturnType<typeof getEventDatesProcedure>
>[number];
