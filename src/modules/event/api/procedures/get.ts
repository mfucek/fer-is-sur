import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { publicProcedure } from '@/deps/trpc/procedures';

export const getProcedure = publicProcedure
	.input(z.object({ id: z.string() }))
	.query(async ({ ctx, input }) => {
		const { db } = ctx;
		const { id } = input;

		const eventRaw = await db.event.findUnique({
			where: { id }
		});

		if (!eventRaw) {
			throw new TRPCError({
				message: 'Event not found',
				code: 'NOT_FOUND'
			});
		}

		const event = {
			id: eventRaw.id,
			createdAt: eventRaw.createdAt,
			updatedAt: eventRaw.updatedAt,
			date: eventRaw.date,
			location: eventRaw.location,
			title: eventRaw.title,
			description: eventRaw.description,
			capacity: eventRaw.capacity,
			price: eventRaw.price / 100,
			externalReservationUrl: eventRaw.externalReservationUrl
		};

		return event;
	});

export type GetEventDTO = Awaited<ReturnType<typeof getProcedure>>;
