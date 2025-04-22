import { z } from 'zod';

import { publicProcedure } from '@/deps/trpc/procedures';
import { eventCreateSchema } from '../../schemas/event-create-schema';

export const createProcedure = publicProcedure
	.input(z.object({ event: eventCreateSchema }))
	.mutation(async ({ ctx, input }) => {
		const { db } = ctx;
		const { event } = input;

		const createdEvent = await db.event.create({
			data: {
				title: event.title,
				description: event.description,
				location: event.location,
				date: event.date,
				capacity: event.capacity,
				price: event.price * 100
			}
		});

		return createdEvent;
	});
