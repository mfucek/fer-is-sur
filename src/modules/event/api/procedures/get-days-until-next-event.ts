import { differenceInDays } from 'date-fns';

import { publicProcedure } from '@/deps/trpc/procedures';

export const getDaysUntilNextEventProcedure = publicProcedure.query(
	async ({ ctx }) => {
		const { db } = ctx;

		const nearestEvent = await db.event.findFirst({
			where: {
				date: {
					gt: new Date()
				}
			},
			orderBy: {
				date: 'asc'
			}
		});

		if (!nearestEvent) {
			return null;
		}

		const daysUntilNextEvent =
			differenceInDays(nearestEvent.date, new Date()) + 1;

		return daysUntilNextEvent;
	}
);
