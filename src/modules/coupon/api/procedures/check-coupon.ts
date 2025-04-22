import { z } from 'zod';

import { publicProcedure } from '@/deps/trpc/procedures';

export const checkCouponProcedure = publicProcedure
	.input(
		z.object({
			couponCode: z.string()
		})
	)
	.mutation(async ({ ctx, input }) => {
		const coupon = await ctx.db.coupon.count({
			where: {
				code: input.couponCode.toUpperCase()
			}
		});

		return coupon > 0;
	});
