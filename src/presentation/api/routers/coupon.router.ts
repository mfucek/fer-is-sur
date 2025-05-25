import { publicProcedure } from '@/deps/trpc/procedures';
import { createTRPCRouter } from '@/deps/trpc/trpc';
import { z } from 'zod';

const couponCreateSchema = z.object({
	code: z.string(),
	creatorByEmail: z.string().email().optional().nullable(),
	expiresAt: z.date().optional().nullable(),
	discountPercent: z.number().optional().nullable(),
	discountAmount: z.number().optional().nullable(),
	maxUses: z.number().int().min(1)
});

const couponUpdateSchema = couponCreateSchema.partial();

export const couponRouter = createTRPCRouter({
	list: publicProcedure.query(async ({ ctx }) => {
		return ctx.couponService.listCoupons();
	}),
	get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
		return ctx.couponService.getCoupon(input);
	}),
	create: publicProcedure
		.input(couponCreateSchema)
		.mutation(async ({ ctx, input }) => {
			return ctx.couponService.createCoupon(input);
		}),
	update: publicProcedure
		.input(z.object({ id: z.string(), data: couponUpdateSchema }))
		.mutation(async ({ ctx, input }) => {
			return ctx.couponService.updateCoupon(input.id, input.data);
		}),
	delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
		await ctx.couponService.deleteCoupon(input);
		return { success: true };
	})
});
