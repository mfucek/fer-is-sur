import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { publicProcedure } from '@/deps/trpc/procedures';
import { dateRangeSchema } from '@/modules/event/schemas/date-range-schema';
import { makeEventDTO } from '../dto/event-dto';

export const listProcedure = publicProcedure
	.input(
		z
			.object({
				date: dateRangeSchema.optional()
			})
			// .merge(paginationSchema)
			.optional()
	)
	.query(async ({ ctx, input }) => {
		const { db } = ctx;
		const dateFrom = input?.date?.dateFrom;
		const dateTo = input?.date?.dateTo;

		const where = {
			date: {
				...(dateFrom ? { gte: dateFrom } : {}),
				...(dateTo ? { lt: dateTo } : {})
			}
		} satisfies Prisma.EventWhereInput;

		const eventsRaw = await db.event.findMany({
			where,
			orderBy: {
				date: 'desc'
			}
		});
		const events = eventsRaw.map(makeEventDTO);

		return events;
	});
