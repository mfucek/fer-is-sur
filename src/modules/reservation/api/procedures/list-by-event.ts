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

		const reservations = await db.reservation.findMany({
			where: { eventId: input.eventId }
		});

		return reservations;
	});
