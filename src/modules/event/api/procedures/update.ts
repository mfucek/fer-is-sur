import { z } from 'zod';

import { authedProcedure } from '@/deps/trpc/procedures';
import { eventUpdateSchema } from '../../schemas/event-update-schema';

export const updateProcedure = authedProcedure
	.input(z.object({ event: eventUpdateSchema }))
	.mutation(async ({ ctx, input }) => {
		const { db } = ctx;
		const { event } = input;

		const updatedEvent = await db.event.update({
			where: { id: event.id },
			data: {
				...event,
				...(event.price ? { price: event.price * 100 } : {})
			}
		});

		return updatedEvent;
	});
