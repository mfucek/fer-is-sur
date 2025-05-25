import { publicProcedure } from '@/deps/trpc/procedures';
import { createTRPCRouter } from '@/deps/trpc/trpc';
import { z } from 'zod';

const userCreateSchema = z.object({
	email: z.string().email(),
	password: z.string()
});

export const userRouter = createTRPCRouter({
	list: publicProcedure.query(async ({ ctx }) => {
		return ctx.userService.listUsers();
	}),
	get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
		return ctx.userService.getUser(input);
	}),
	create: publicProcedure
		.input(userCreateSchema)
		.mutation(async ({ ctx, input }) => {
			return ctx.userService.createUser(input);
		}),
	delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
		await ctx.userService.deleteUser(input);
		return { success: true };
	})
});
