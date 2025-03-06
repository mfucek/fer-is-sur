import { z } from 'zod';

import { publicProcedure } from '@/deps/trpc/procedures';
import { getFileDownloadUrl } from '@/modules/file/helpers/get-download-url';

export const getCoverProcedure = publicProcedure
	.input(z.object({ eventId: z.string() }))
	.query(async ({ ctx, input }) => {
		const { db } = ctx;
		const { eventId } = input;

		const coverRaw = await db.eventCover.findUnique({
			where: { eventId },
			include: {
				Image: true
			}
		});

		const coverUrl = coverRaw?.Image
			? await getFileDownloadUrl(coverRaw?.Image?.key)
			: null;

		return {
			...coverRaw,
			url: coverUrl
		};
	});
