import { createCallerFactory, createTRPCRouter } from '@/deps/trpc/trpc';
import { authRouter } from '@/modules/auth/api/router';
import { couponRouter } from '@/modules/coupon/api/router';
import { eventRouter } from '@/modules/event/api/router';
import { fileRouter } from '@/modules/file/api/router';
import { reservationRouter } from '@/modules/reservation/api/router';
import { userRouter } from '@/modules/user/api/router';

export const appRouter = createTRPCRouter({
	auth: authRouter,

	event: eventRouter,
	coupon: couponRouter,
	user: userRouter,
	reservation: reservationRouter,

	file: fileRouter
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
