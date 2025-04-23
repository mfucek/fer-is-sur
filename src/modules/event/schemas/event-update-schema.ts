import { z } from 'zod';

export const eventUpdateSchema = z.object({
	id: z.string().cuid(),
	title: z.string().min(1, 'Title is required').optional(),
	description: z.string().min(1, 'Description is required').optional(),
	location: z.string().min(1, 'Location is required').optional(),
	date: z.date().optional(),
	capacity: z.number().optional(),
	price: z.number().min(1).step(0.01).optional(),
	externalReservationUrl: z.string().optional()
});
export type TEventUpdateSchema = z.infer<typeof eventUpdateSchema>;
