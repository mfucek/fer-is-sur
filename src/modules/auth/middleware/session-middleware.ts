import { createTRPCMiddleware } from '@/deps/trpc/trpc';
import { TRPCError } from '@trpc/server';
import {
	getSessionCookie,
	removeSessionCookie,
	setSessionCookie
} from '../api/session';

/* Middlewares */

export const sessionMiddleware = createTRPCMiddleware(async ({ ctx, next }) => {
	const { db } = ctx;

	// check for session
	const session = await getSessionCookie();

	if (!session) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	// check for user in db
	const user = await db.user.findUnique({
		where: {
			id: session.user.id
		}
	});

	if (!user) {
		await removeSessionCookie();
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	// renew session
	const newSession = await setSessionCookie(user);

	// add session to context
	return next({ ctx: { ...ctx, session: newSession } });
});

export const optionalSessionMiddleware = createTRPCMiddleware(
	async ({ ctx, next }) => {
		const { db } = ctx;

		// check for session
		const session = await getSessionCookie();

		if (!session) {
			return next({ ctx: { ...ctx, session: null } });
		}

		// check for user in db
		const user = await db.user.findUnique({
			where: {
				id: session.user.id
			}
		});

		if (!user) {
			await removeSessionCookie();
			return next({ ctx: { ...ctx, session: null } });
		}

		// renew session
		const newSession = await setSessionCookie(user);

		// add session to context
		return next({ ctx: { ...ctx, session: newSession } });
	}
);
