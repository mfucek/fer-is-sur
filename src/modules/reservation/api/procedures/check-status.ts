import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { publicProcedure } from '@/deps/trpc/procedures';

export const checkStatusProcedure = publicProcedure
	.input(
		z.object({
			reservationId: z.string()
		})
	)
	.query(async ({ ctx, input }) => {
		const { db } = ctx;
		const { reservationId } = input;

		const reservationRaw = await db.reservation.findUnique({
			where: { id: reservationId }
		});

		if (!reservationRaw) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Reservation not found.'
			});
		}

		const reservation = {
			paymentStatus: reservationRaw.paymentStatus,
			reservationStatus: reservationRaw.reservationStatus
		};

		return reservation;
	});
