import { z } from 'zod';

import { authedProcedure } from '@/deps/trpc/procedures';
import { cleanUpOrphanedFiles } from '../helpers/clean-up-orphaned-files';

export const updateGalleryProcedure = authedProcedure
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
	});
