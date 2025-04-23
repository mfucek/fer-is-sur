import { z } from 'zod';

import { authedProcedure } from '@/deps/trpc/procedures';
import { eventCreateSchema } from '../../schemas/event-create-schema';

export const createProcedure = authedProcedure
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
				price: event.price * 100,
				externalReservationUrl: event.externalReservationUrl
			}
		});

		return createdEvent;
	});
