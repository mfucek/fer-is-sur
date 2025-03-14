import { createCallerFactory, createTRPCRouter } from '@/deps/trpc/trpc';
import { authRouter } from '@/modules/auth/api/router';
import { couponRouter } from '@/modules/coupon/api/router';
import { eventRouter } from '@/modules/event/api/router';
import { fileRouter } from '@/modules/file/api/router';
import { PurchaseConfirmationMail } from '@/modules/mailer/templates/purchase-confirmation-mail';
import { reservationRouter } from '@/modules/reservation/api/router';
import { sendMailWithHTML } from '../nodemailer';
import { publicProcedure } from './procedures';

export const appRouter = createTRPCRouter({
	auth: authRouter,

	event: eventRouter,
	coupon: couponRouter,
	reservation: reservationRouter,

	file: fileRouter,

	sendMail: publicProcedure.mutation(async ({}) => {
		await sendMailWithHTML({
			subject: 'subject',
			toEmail: 'matijafucek1@gmail.com',
			content: PurchaseConfirmationMail()
		});
	})
});

export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
