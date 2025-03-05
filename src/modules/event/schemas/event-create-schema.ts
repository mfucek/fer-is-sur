import { z } from 'zod';

export const eventCreateSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	description: z.string().min(1, 'Description is required'),
	location: z.string().min(1, 'Location is required'),
	date: z.date(),
	capacity: z.number().min(1, 'Capacity is required'),
	price: z.number().min(1, 'Price is required')
});
export type TEventCreateSchema = z.infer<typeof eventCreateSchema>;
