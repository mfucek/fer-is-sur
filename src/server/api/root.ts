import { createCallerFactory, createTRPCRouter, t } from '@/server/api/trpc';

export const appRouter = createTRPCRouter({
	test: createTRPCRouter({
		hello: t.procedure.query(() => {
			return 'Hello World';
		})
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
