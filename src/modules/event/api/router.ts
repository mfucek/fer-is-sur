import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { Event } from '@prisma/client';
import { eventCreateSchema } from '../schemas';

const makeEventDTO = (event: Event) => ({
	id: event.id,
	createdAt: event.createdAt,
	updatedAt: event.updatedAt,
	title: event.title,
	description: event.description
});

export type EventDTO = ReturnType<typeof makeEventDTO>;

export const eventRouter = createTRPCRouter({
	list: publicProcedure.query(async ({ ctx }) => {
		const { db } = ctx;

		const eventsRaw = await db.event.findMany();
		const events = eventsRaw.map(makeEventDTO);

		return events;
	}),

	get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
		return [];
	}),

	create: publicProcedure
		.input(z.object({ event: eventCreateSchema }))
		.mutation(async ({ ctx, input }) => {
			const { db } = ctx;
			const { event } = input;

			const createdEvent = await db.event.create({
				data: {
					title: event.title,
					description: event.description,
					location: event.location,
					date: event.date
				}
			});

			return createdEvent;
		}),

	update: publicProcedure
		.input(z.object({}))
		.mutation(async ({ ctx, input }) => {
			return [];
		}),

	delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
		return [];
	})
});
