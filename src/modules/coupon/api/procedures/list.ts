import { authedProcedure } from '@/deps/trpc/procedures';

export const listProcedure = authedProcedure.query(async ({ ctx }) => {
	const coupons = await ctx.db.coupon.findMany({
		include: {
			_count: {
				select: {
					Reservations: true
				}
			}
		}
	});

	return coupons;
});

export type ListCouponsItem = Awaited<ReturnType<typeof listProcedure>>[number];
