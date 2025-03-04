import { createTRPCRouter, publicProcedure } from '@/deps/trpc/trpc';
import { z } from 'zod';

export const couponRouter = createTRPCRouter({
	list: publicProcedure.query(async ({ ctx }) => {
		const coupons = await ctx.db.coupon.findMany();

		return coupons;
	}),

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

	create: publicProcedure
		.input(
			z.object({
				code: z.string(),
				discountPercent: z.number().optional(),
				discountAmount: z.number().optional(),
				expiresAt: z.date().optional()
			})
		)
		.mutation(async ({ ctx, input }) => {
			const coupon = await ctx.db.coupon.create({
				data: {
					code: input.code,
					discountPercent: input.discountPercent,
					discountAmount: input.discountAmount,
					expiresAt: input.expiresAt
				}
			});

			return coupon;
		})
});
