import { createTRPCRouter } from '@/deps/trpc/trpc';
import { checkStatusProcedure } from './procedures/check-status';
import { listProcedure } from './procedures/list';
import { listByCouponProcedure } from './procedures/list-by-coupon';
import { listByEventProcedure } from './procedures/list-by-event';
import { refundReservationProcedure } from './procedures/refund-reservation';
import { reserveProcedure } from './procedures/reserve';

export const reservationRouter = createTRPCRouter({
	list: listProcedure,
	listByCoupon: listByCouponProcedure,
	listByEvent: listByEventProcedure,
	reserve: reserveProcedure,
	checkStatus: checkStatusProcedure,
	refund: refundReservationProcedure
});
