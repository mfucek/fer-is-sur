import { createTRPCRouter } from '@/deps/trpc/trpc';
import { checkCouponProcedure } from './procedures/check-coupon';
import { createCouponProcedure } from './procedures/create';
import { deleteProcedure } from './procedures/delete';
import { listProcedure } from './procedures/list';
import { purchaseCouponProcedure } from './procedures/purchase';

export const couponRouter = createTRPCRouter({
	list: listProcedure,
	checkCoupon: checkCouponProcedure,
	create: createCouponProcedure,
	purchase: purchaseCouponProcedure,
	delete: deleteProcedure
});
