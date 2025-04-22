import { z } from 'zod';

export const couponPurchaseSchema = z.object({
	email: z.string().email(),
	amount: z.number().min(0).step(0.01)
});

export type TCouponPurchaseSchema = z.infer<typeof couponPurchaseSchema>;
