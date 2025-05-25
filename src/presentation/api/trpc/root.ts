import { createTRPCRouter } from '@/deps/trpc/trpc';
import { couponRouter } from '../routers/coupon.router';
import { eventRouter } from '../routers/event.router';
import { reservationRouter } from '../routers/reservation.router';
import { userRouter } from '../routers/user.router';

export const appRouter = createTRPCRouter({
	coupon: couponRouter,
	event: eventRouter,
	reservation: reservationRouter,
	user: userRouter
});

export type AppRouter = typeof appRouter;
