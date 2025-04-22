import { authedProcedure } from '@/deps/trpc/procedures';
import { userCreateSchema } from '../../schemas/user-create-schema';

export const createUserProcedure = authedProcedure
	.input(userCreateSchema)
	.mutation(async ({ ctx, input }) => {
		const { email } = input;

		const userRaw = await ctx.db.user.create({
			data: {
				email,
				password: ''
			}
		});

		const user = {
			id: userRaw.id,
			email: userRaw.email,
			createdAt: userRaw.createdAt,
			updatedAt: userRaw.updatedAt
		};

		return user;
	});
