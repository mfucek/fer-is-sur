import { differenceInDays } from 'date-fns';

import { publicProcedure } from '@/deps/trpc/procedures';

export const getDaysUntilNextEventProcedure = publicProcedure.query(
	async ({ ctx }) => {
		const { db } = ctx;

		const nearestEvent = await db.event.findFirst({
			orderBy: {
				date: 'desc'
			}
		});

		if (!nearestEvent) {
			return null;
		}

		const daysUntilNextEvent = differenceInDays(nearestEvent.date, new Date());

		return daysUntilNextEvent;
	}
);
