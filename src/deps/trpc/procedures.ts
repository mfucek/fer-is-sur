import { t } from './trpc';

import {
	optionalSessionMiddleware,
	sessionMiddleware
} from '@/modules/auth/middleware/session-middleware';

export const publicProcedure = t.procedure;
export const authedProcedure = t.procedure.use(sessionMiddleware);
export const maybeAuthedProcedure = t.procedure.use(optionalSessionMiddleware);
