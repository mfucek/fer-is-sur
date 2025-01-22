import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { type Prisma } from '@prisma/client';
import {
	dateRangeSchema,
	eventCreateSchema,
	eventUpdateSchema
} from '../schemas';
import { makeEventDTO } from './dto/event-dto';

export const eventRouter = createTRPCRouter({
	list: publicProcedure
		.input(
			z
				.object({
					date: dateRangeSchema.optional()
				})
				// .merge(paginationSchema)
				.optional()
		)
		.query(async ({ ctx, input }) => {
			const { db } = ctx;
			const dateFrom = input?.date?.dateFrom;
			const dateTo = input?.date?.dateTo;

			const where = {
				date: {
					...(dateFrom ? { gte: dateFrom } : {}),
					...(dateTo ? { lt: dateTo } : {})
				}
			} satisfies Prisma.EventWhereInput;

			const eventsRaw = await db.event.findMany({
				where,
				orderBy: {
					date: 'desc'
				}
			});
			const events = eventsRaw.map(makeEventDTO);

			return events;
		}),

	get: publicProcedure
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
		.input(z.object({ event: eventUpdateSchema }))
		.mutation(async ({ ctx, input }) => {
			const { db } = ctx;
			const { event } = input;

			const updatedEvent = await db.event.update({
				where: { id: event.id },
				data: event
			});

			return updatedEvent;
		}),

	delete: publicProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const { db } = ctx;
			const { id } = input;

			const deletedEvent = await db.event.delete({
				where: {
					id
				}
			});

			return deletedEvent;
		})
});
