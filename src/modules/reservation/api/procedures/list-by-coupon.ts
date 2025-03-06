import { z } from 'zod';

import { publicProcedure } from '@/deps/trpc/procedures';

export const listByCouponProcedure = publicProcedure
	.input(
		z.object({
			couponId: z.string()
		})
	)
	.query(async ({ ctx, input }) => {
		const { db } = ctx;

		const reservations = await db.reservation.findMany({
			where: { couponId: input.couponId }
		});

		return reservations;
	});
