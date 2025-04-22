import { z } from 'zod';

export const couponCreateSchema = z.object({
	code: z.string().optional(),
	discountPercent: z
		.number()
		.max(100, 'Discount percent must be less than 100')
		.optional(),
	discountAmount: z
		.number()
		.min(0, 'Discount amount is required')
		.step(0.01)
		.optional(),
	maxUses: z.number().optional(),
	expiresAt: z.date().optional()
});

export type TCouponCreateSchema = z.infer<typeof couponCreateSchema>;
