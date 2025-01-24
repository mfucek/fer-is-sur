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
		}),

	updateGallery: publicProcedure
		.input(z.object({ eventId: z.string(), fileKeys: z.array(z.string()) }))
		.mutation(async ({ ctx, input }) => {
			const { db } = ctx;
			const { eventId, fileKeys } = input;

			// Find files based on keys
			const existingFiles = await db.file.findMany({
				where: {
					key: {
						in: fileKeys
					}
				}
			});

			// Get keys that don't exist in the database
			const newKeys = fileKeys.filter(
				(key) => !existingFiles.some((file) => file.key === key)
			);

			// Create new files
			const newFiles = await db.file.createManyAndReturn({
				// @TODO: fix properties below
				data: newKeys.map((key) => ({
					key,
					contentType: 'image/jpeg',
					size: 0
				}))
			});

			const files = [...existingFiles, ...newFiles];

			// Delete old gallery
			await db.$transaction(async (tx) => {
				const exists = await tx.eventGallery.findFirst({
					where: {
						eventId
					}
				});

				if (exists) {
					await tx.eventGallery.deleteMany({ where: { eventId } });
				}
			});

			// Create a new image gallery on event
			const event = await db.event.update({
				where: { id: eventId },
				data: {
					Gallery: {
						create: {
							Images: {
								connect: files.map((file) => ({ id: file.id }))
							}
						}
					}
				}
			});

			// // Remove orphaned files
			// const orphanedFiles = await db.file.deleteMany({
			// 	where: {
			// 		AND: [
			// 			{
			// 				EventCover: {
			// 					none: {}
			// 				}
			// 			},
			// 			{
			// 				EventGallery: {
			// 					none: {}
			// 				}
			// 			}
			// 		]
			// 	}
			// });

			return event;
		}),

	getGallery: publicProcedure
		.input(z.object({ eventId: z.string() }))
		.query(async ({ ctx, input }) => {
			const { db } = ctx;
			const { eventId } = input;

			const gallery = await db.eventGallery.findUnique({
				where: { eventId },
				include: {
					Images: true
				}
			});

			return gallery;
		})
});
