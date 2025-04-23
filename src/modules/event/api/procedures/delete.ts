import { z } from 'zod';

import { authedProcedure } from '@/deps/trpc/procedures';
import { TRPCError } from '@trpc/server';
import { cleanUpOrphanedFiles } from '../helpers/clean-up-orphaned-files';

export const deleteProcedure = authedProcedure
	.input(z.object({ id: z.string() }))
	.mutation(async ({ ctx, input }) => {
		const { db } = ctx;
		const { id } = input;

		const paidReservations = await db.reservation.count({
			where: { eventId: id, paymentStatus: 'PAID' }
		});

		if (paidReservations > 0) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Cannot delete event with paid reservations'
			});
		}

		const deletedReservations = await db.reservation.deleteMany({
			where: { eventId: id }
		});

		const deletedGallery = await db.eventGallery.deleteMany({
			where: { eventId: id }
		});

		const deletedCover = await db.eventCover.deleteMany({
			where: { eventId: id }
		});

		const deletedEvent = await db.event.delete({
			where: {
				id
			}
		});

		await cleanUpOrphanedFiles(db);

		return deletedEvent;
	});
