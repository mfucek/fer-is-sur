import { db } from '@/deps/db';
import {
	authedProcedure,
	createTRPCRouter,
	maybeAuthedProcedure,
	publicProcedure
} from '@/deps/trpc/trpc';
import { TRPCError } from '@trpc/server';
import { hash } from 'bcrypt';
import { z } from 'zod';
import { comparePassword } from '../helpers/compare-password';
import { removeSessionCookie, setSessionCookie } from './session';

export const authRouter = createTRPCRouter({
	logIn: publicProcedure
		.input(
			z.object({
				email: z.string(),
				password: z.string()
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { db } = ctx;

			const user = await db.user.findUnique({
				where: { email: input.email }
			});

			if (!user) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Invalid credentials'
				});
			}

			if (user.password) {
				// check password
				if (!(await comparePassword(user, input.password))) {
					throw new TRPCError({
						code: 'UNAUTHORIZED',
						message: 'Invalid credentials'
					});
				}
			}

			// set session cookie
			const session = await setSessionCookie(user);

			return {
				session
			};
		}),

	logOut: authedProcedure.mutation(async ({ ctx }) => {
		await removeSessionCookie();

		return {
			success: true
		};
	}),

	changePassword: authedProcedure
		.input(
			z.object({
				oldPassword: z.string(),
				newPassword: z.string()
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { session } = ctx;

			const user = (await db.user.findUnique({
				where: { id: session.user.id }
			}))!;

			if (!comparePassword(user, input.oldPassword)) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'Invalid old password'
				});
			}

			const hashedPassword = await hash(input.newPassword, 10);

			await db.user.update({
				where: { id: session.user.id },
				data: { password: hashedPassword }
			});

			return {
				success: true
			};
		}),

	me: maybeAuthedProcedure.query(async ({ ctx }) => {
		const { session } = ctx;

		return {
			loggedIn: !!session,
			session
		};
	})
});
