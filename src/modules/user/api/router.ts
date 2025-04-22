import { createTRPCRouter } from '@/deps/trpc/trpc';

import { createUserProcedure } from './procedures/create';
import { deleteUserProcedure } from './procedures/delete';
import { listUsersProcedure } from './procedures/list';

export const userRouter = createTRPCRouter({
	list: listUsersProcedure,
	create: createUserProcedure,
	delete: deleteUserProcedure
});
