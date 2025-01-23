import { eventRouter } from '@/modules/event/api/router';
import { fileRouter } from '@/modules/file/api/router';
import { createCallerFactory, createTRPCRouter } from '@/server/api/trpc';

export const appRouter = createTRPCRouter({
	event: eventRouter,
	file: fileRouter
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
