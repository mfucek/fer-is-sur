import { z } from 'zod';

export const eventCreateSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	description: z.string().min(1, 'Description is required'),
	location: z.string().min(1, 'Location is required'),
	date: z.date()
});

export const eventUpdateSchema = z.object({
	id: z.string().cuid(),
	title: z.string().min(1, 'Title is required').optional(),
	description: z.string().min(1, 'Description is required').optional(),
	location: z.string().min(1, 'Location is required').optional(),
	date: z.date().optional()
});

export const dateRangeSchema = z.object({
	dateFrom: z.date().nullish(),
	dateTo: z.date().nullish()
});

export type TEventCreateSchema = z.infer<typeof eventCreateSchema>;
export type TEventUpdateSchema = z.infer<typeof eventUpdateSchema>;

export type TDateRangeSchema = z.infer<typeof dateRangeSchema>;
