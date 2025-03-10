import { PrismaClient } from '@prisma/client';

const THRESHOLD = 1000 * 60 * 10; // 10 minutes

export const clearStaleReservations = async (db: PrismaClient) => {
	const reservations = await db.reservation.findMany({
		where: {
			createdAt: { lt: new Date(Date.now() - THRESHOLD) },
			reservationStatus: 'PENDING',
			paymentStatus: 'NOT_PAID'
		}
	});

	const deletedReservations = await db.reservation.deleteMany({
		where: {
			id: { in: reservations.map((reservation) => reservation.id) }
		}
	});

	return {
		deletedIds: reservations.map((reservation) => reservation.id)
	};
};
