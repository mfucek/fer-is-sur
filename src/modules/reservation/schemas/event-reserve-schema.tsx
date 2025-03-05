import { z } from 'zod';

export const eventReserveSchema = z.object({
	email: z.string().email(),
	couponCode: z.string().optional()
});

export type TEventReserveSchema = z.infer<typeof eventReserveSchema>;
