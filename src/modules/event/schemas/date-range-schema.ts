import { z } from 'zod';

export const dateRangeSchema = z.object({
	dateFrom: z.date().nullish(),
	dateTo: z.date().nullish()
});

export type TDateRangeSchema = z.infer<typeof dateRangeSchema>;
