import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { db } from '@/deps/db';
import { getSessionCookie, setSessionCookie } from '@/modules/auth/api/session';

/* CONTEXT */
export const createTRPCContext = async (opts: { headers: Headers }) => {
	return {
		db,
		session: null,
		...opts
	};
};

/* INITIALIZATION */
export const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
			}
		};
	}
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const createTRPCMiddleware = t.middleware;

/* Middlewares */
const sessionMiddleware = createTRPCMiddleware(async ({ ctx, next }) => {
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

const optionalSessionMiddleware = createTRPCMiddleware(
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
			return next({ ctx: { ...ctx, session: null } });
		}

		// renew session
		const newSession = await setSessionCookie(user);

		// add session to context
		return next({ ctx: { ...ctx, session: newSession } });
	}
);

/* PROCEDURES */

export const publicProcedure = t.procedure;

export const authedProcedure = t.procedure.use(sessionMiddleware);

export const maybeAuthedProcedure = t.procedure.use(optionalSessionMiddleware);
