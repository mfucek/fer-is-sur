import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { authedProcedure } from '@/deps/trpc/procedures';
import { dateRangeSchema } from '@/modules/event/schemas/date-range-schema';

export const listProcedure = authedProcedure
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
			},
			include: {
				Reservations: true
			}
		});

		const events = eventsRaw.map((event) => ({
			id: event.id,
			createdAt: event.createdAt,
			updatedAt: event.updatedAt,
			date: event.date,
			location: event.location,
			title: event.title,
			description: event.description,
			capacity: event.capacity,
			price: event.price,
			reservations: event.Reservations.filter(
				(reservation) => reservation.reservationStatus === 'CONFIRMED'
			).reduce((acc, reservation) => acc + reservation.quantity, 0)
		}));

		return events;
	});

export type EventListItemDTO = Awaited<
	ReturnType<typeof listProcedure>
>[number];
