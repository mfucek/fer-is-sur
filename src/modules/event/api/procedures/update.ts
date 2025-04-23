import { z } from 'zod';

import { authedProcedure } from '@/deps/trpc/procedures';
import { eventUpdateSchema } from '../../schemas/event-update-schema';

export const updateProcedure = authedProcedure
	.input(z.object({ event: eventUpdateSchema }))
	.mutation(async ({ ctx, input }) => {
		const { db } = ctx;
		const { event } = input;

		const eventRaw = await db.event.update({
			where: { id: event.id },
			data: {
				...event,
				...(event.price ? { price: event.price * 100 } : {})
			}
		});

		const updatedEvent = {
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

		return updatedEvent;
	});
