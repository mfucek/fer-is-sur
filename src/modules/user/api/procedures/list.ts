import { authedProcedure } from '@/deps/trpc/procedures';

export const listUsersProcedure = authedProcedure.query(async ({ ctx }) => {
	const { db } = ctx;

	const usersRaw = await db.user.findMany();

	const users = usersRaw.map((user) => ({
		id: user.id,
		email: user.email,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt
	}));

	return users;
});

export type ListUsersItemDTO = Awaited<
	ReturnType<typeof listUsersProcedure>
>[number];
