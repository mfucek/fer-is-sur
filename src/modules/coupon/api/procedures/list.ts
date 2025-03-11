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
		discountAmount: coupon.discountAmount,
		maxUses: coupon.maxUses,
		uses: coupon.Reservations.filter(
			(reservation) => reservation.reservationStatus === 'CONFIRMED'
		).reduce((acc, reservation) => acc + reservation.quantity, 0)
	}));

	return coupons;
});

export type ListCouponsItemDTO = Awaited<
	ReturnType<typeof listProcedure>
>[number];
