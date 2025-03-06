import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { publicProcedure } from '@/deps/trpc/procedures';
import { makeEventDTO } from '../dto/event-dto';

export const getProcedure = publicProcedure
	.input(z.object({ id: z.string() }))
	.query(async ({ ctx, input }) => {
		const { db } = ctx;
		const { id } = input;

		const event = await db.event.findUnique({
			where: { id }
		});

		if (!event) {
			throw new TRPCError({
				message: 'Event not found',
				code: 'NOT_FOUND'
			});
		}

		return makeEventDTO(event);
	});
