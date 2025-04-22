import { z } from 'zod';

import { publicProcedure } from '@/deps/trpc/procedures';
import { createTRPCRouter } from '@/deps/trpc/trpc';
import { createCouponProcedure } from './procedures/create';
import { deleteProcedure } from './procedures/delete';
import { listProcedure } from './procedures/list';
import { purchaseCouponProcedure } from './procedures/purchase';

export const couponRouter = createTRPCRouter({
	list: listProcedure,

	get: publicProcedure
		.input(
			z.object({
				id: z.string()
			})
		)
		.query(async ({ ctx, input }) => {
			const coupon = await ctx.db.coupon.findUnique({
				where: { id: input.id }
			});
		}),

	checkCoupon: publicProcedure
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
		}),

	create: createCouponProcedure,

	purchase: purchaseCouponProcedure,

	delete: deleteProcedure
});
