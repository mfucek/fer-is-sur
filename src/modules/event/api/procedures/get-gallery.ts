import { z } from 'zod';

import { publicProcedure } from '@/deps/trpc/procedures';

export const getGalleryProcedure = publicProcedure
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
	});
