import { authedProcedure } from '@/deps/trpc/procedures';

export const listProcedure = authedProcedure.query(async ({ ctx }) => {
	const { db } = ctx;

	const reservations = await db.reservation.findMany();

	return reservations;
});
