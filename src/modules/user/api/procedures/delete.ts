import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { authedProcedure } from '@/deps/trpc/procedures';

export const deleteUserProcedure = authedProcedure
	.input(z.object({ id: z.string() }))
	.mutation(async ({ ctx, input }) => {
		const { db } = ctx;
		const { id } = input;

		const user = await db.user.findUnique({
			where: { id }
		});

		if (!user) {
			throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
		}

		await db.user.delete({ where: { id } });

		return {
			deleted: true
		};
	});
