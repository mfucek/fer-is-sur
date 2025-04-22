import { createTRPCRouter } from '@/deps/trpc/trpc';
import { cancelProcedure } from './procedures/cancel';
import { checkStatusProcedure } from './procedures/check-status';
import { getByIdProcedure } from './procedures/get-by-id';
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
	refund: refundReservationProcedure,
	getById: getByIdProcedure,
	cancel: cancelProcedure
});
