import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/deps/trpc/trpc';
import { deleteFile } from '@/modules/file/helpers/delete-file';
import { PrismaClient, type Prisma } from '@prisma/client';
import { addMonths, subMonths } from 'date-fns';
import {
	dateRangeSchema,
	eventCreateSchema,
	eventUpdateSchema
} from '../schemas';
import { makeEventDTO } from './dto/event-dto';
import { listShowcaseProcedure } from './procedures/list-showcase';

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

			const deletedGallery = await db.eventGallery.deleteMany({
				where: { eventId: id }
			});

			const deletedCover = await db.eventCover.deleteMany({
				where: { eventId: id }
			});

			const deletedEvent = await db.event.delete({
				where: {
					id
				}
			});

			await cleanUpOrphanedFiles(db);

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

			await cleanUpOrphanedFiles(db);

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
		}),

	updateCover: publicProcedure
		.input(z.object({ eventId: z.string(), fileKey: z.string().nullable() }))
		.mutation(async ({ ctx, input }) => {
			const { db } = ctx;
			const { eventId, fileKey } = input;

			if (!fileKey) {
				const existingCover = await db.eventCover.findFirst({
					where: { eventId }
				});

				if (existingCover) {
					await db.eventCover.delete({ where: { eventId } });
				}

				await cleanUpOrphanedFiles(db);

				return null;
			}

			const event = await db.event.findUnique({
				where: { id: eventId },
				include: {
					CoverImage: {
						include: {
							Image: true
						}
					}
				}
			});

			// remove old cover image
			if (event?.CoverImage) {
				if (event.CoverImage.Image) {
					await db.file.delete({ where: { id: event.CoverImage.Image.id } });
				}
				await db.eventCover.delete({ where: { eventId } });
			}

			// create new file
			const newFile = await db.file.create({
				data: {
					key: fileKey,
					contentType: 'image/jpeg',
					size: 0
				}
			});

			// create new cover image
			const newCover = await db.eventCover.create({
				data: {
					eventId,
					imageId: newFile.id
				}
			});

			await cleanUpOrphanedFiles(db);

			return newCover;
		}),

	getCover: publicProcedure
		.input(z.object({ eventId: z.string() }))
		.query(async ({ ctx, input }) => {
			const { db } = ctx;
			const { eventId } = input;

			const cover = await db.eventCover.findUnique({
				where: { eventId },
				include: {
					Image: true
				}
			});

			return cover;
		}),

	listShowcase: listShowcaseProcedure,
	getEventDates: publicProcedure
		.input(z.object({ monthDate: z.number() }))
		.mutation(async ({ ctx, input }) => {
			// month previous to the given date's month
			const dateFrom = subMonths(input.monthDate, 1);
			const dateTo = addMonths(input.monthDate, 1);

			const eventsRaw = await ctx.db.event.findMany({
				where: {
					date: { gte: dateFrom, lte: dateTo }
				}
			});

			const events = eventsRaw.map((eventRaw) => ({ ...eventRaw }));

			return events;
		})
});

const cleanUpOrphanedFiles = async (db: PrismaClient) => {
	const files = await db.file.findMany({
		where: {
			NOT: [
				{
					EventCover: {
						some: {}
					}
				},
				{ EventGallery: { some: {} } }
			]
		}
	});

	const fileIds = files.map((file) => file.id);

	await db.file.deleteMany({
		where: {
			id: {
				in: fileIds
			}
		}
	});

	await Promise.all(files.map((file) => deleteFile(file.key)));

	return files;
};
