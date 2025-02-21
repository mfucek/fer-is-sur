import { publicProcedure } from '@/server/api/trpc';
import { type Prisma } from '@prisma/client';
import { makeEventDTO } from '../dto/event-dto';

export const listShowcaseProcedure = publicProcedure.query(async ({ ctx }) => {
	const { db } = ctx;

	const where = {
		date: {
			lt: new Date()
		}
	} satisfies Prisma.EventWhereInput;

	const eventsRaw = await db.event.findMany({
		where,
		orderBy: {
			date: 'desc'
		},
		take: 3
	});
	const events = eventsRaw.map(makeEventDTO);

	return events;
});
