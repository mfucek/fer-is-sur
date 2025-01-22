import { createTRPCRouter, t } from '@/server/api/trpc';
import { z } from 'zod';

export const eventRouter = createTRPCRouter({
	list: t.procedure.query(async ({ ctx }) => {
		return [];
	}),
	get: t.procedure.input(z.string()).query(async ({ ctx, input }) => {
		return [];
	}),
	create: t.procedure.input(z.object({})).mutation(async ({ ctx, input }) => {
		return [];
	}),
	update: t.procedure.input(z.object({})).mutation(async ({ ctx, input }) => {
		return [];
	}),
	delete: t.procedure.input(z.string()).mutation(async ({ ctx, input }) => {
		return [];
	})
});
