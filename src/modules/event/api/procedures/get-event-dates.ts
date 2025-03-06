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
			const occupiedSlots = eventRaw.Reservations.reduce(
				(acc, reservation) => acc + reservation.quantity,
				0
			);

			return {
				...eventRaw,
				remainingSlots: eventRaw.capacity - occupiedSlots
			};
		});

		return events;
	});

export type EventDateDTO = Awaited<
	ReturnType<typeof getEventDatesProcedure>
>[number];
