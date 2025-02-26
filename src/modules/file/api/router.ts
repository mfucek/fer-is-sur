import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/lib/trpc/trpc';
import { nanoid } from 'nanoid';
import { getFileDownloadUrl } from '../helpers/get-download-url';
import { getFileUploadUrl } from '../helpers/get-file-upload-url';

export const fileRouter = createTRPCRouter({
	makeUploadUrl: publicProcedure.mutation(async ({ ctx }) => {
		const key = nanoid();
		const url = await getFileUploadUrl(key);
		return { url, key };
	}),

	makeDownloadUrl: publicProcedure
		.input(z.object({ key: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const { key } = input;
			const url = await getFileDownloadUrl(key);
			return { url };
		})
});
