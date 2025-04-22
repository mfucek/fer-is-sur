import { authedProcedure } from '@/deps/trpc/procedures';

export const listProcedure = authedProcedure.query(async ({ ctx }) => {
	const couponsRaw = await ctx.db.coupon.findMany({
		include: {
			Reservations: true
		}
	});

	const coupons = couponsRaw.map((coupon) => ({
		id: coupon.id,
		code: coupon.code,
		createdAt: coupon.createdAt,
		expiresAt: coupon.expiresAt,
		discountPercent: coupon.discountPercent,
		discountAmount: coupon.discountAmount ? coupon.discountAmount / 100 : null,
		maxUses: coupon.maxUses,
		uses: coupon.Reservations.filter(
			(reservation) => reservation.reservationStatus === 'CONFIRMED'
		).reduce((acc, reservation) => acc + 1, 0),
		creatorByEmail: coupon.creatorByEmail
	}));

	return coupons;
});

export type ListCouponsItemDTO = Awaited<
	ReturnType<typeof listProcedure>
>[number];
