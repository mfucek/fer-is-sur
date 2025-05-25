import { type NextRequest } from 'next/server';

// import { appRouter } from '@/deps/trpc/root';
// The new appRouter is in src/presentation/api/trpc/root.ts
import { createTRPCContext } from '@/deps/trpc/trpc';

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
	return createTRPCContext({
		headers: req.headers
		// auth: getAuth(req)
	});
};

// export const trpcApiHandler = (req: NextRequest) =>
// 	fetchRequestHandler({
// 		endpoint: '/api/trpc',
// 		req,
// 		router: appRouter,
// 		createContext: () => createContext(req),
// 		onError:
// 			env.NODE_ENV === 'development'
// 				? ({ path, error }) => {
// 					console.error(
// 						`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
// 					);
// 				}
// 			: undefined
// 	});
