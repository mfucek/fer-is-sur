import { z } from 'zod';

import { publicProcedure } from '@/deps/trpc/procedures';
import { cleanUpOrphanedFiles } from '../helpers/clean-up-orphaned-files';

export const deleteProcedure = publicProcedure
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
	});
