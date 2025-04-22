import { z } from 'zod';

export const couponPurchaseSchema = z.object({
	email: z.string().email(),
	amount: z.number().min(0)
});

export type TCouponPurchaseSchema = z.infer<typeof couponPurchaseSchema>;
