import { z } from 'zod';

import { authedProcedure } from '@/deps/trpc/procedures';
import { cleanUpOrphanedFiles } from '../helpers/clean-up-orphaned-files';

export const updateCoverProcedure = authedProcedure
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
	});
