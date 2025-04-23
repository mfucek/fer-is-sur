import { z } from 'zod';

export const couponPurchaseSchema = z.object({
	creatorEmail: z.string().email(),
	recipientEmail: z.string().email(),
	recepientMessage: z.string().optional(),
	amount: z.number().min(0).step(0.01)
});

export type TCouponPurchaseSchema = z.infer<typeof couponPurchaseSchema>;
