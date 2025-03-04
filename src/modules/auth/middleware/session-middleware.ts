import { createTRPCMiddleware } from '@/deps/trpc/trpc';
import { TRPCError } from '@trpc/server';
import { getSessionCookie, setSessionCookie } from '../api/session';

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
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	// renew session
	const newSession = await setSessionCookie(user);

	// add session to context
	return next({ ctx: { ...ctx, session: newSession } });
});
