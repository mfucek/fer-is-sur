import { publicProcedure } from '@/deps/trpc/procedures';
import { createTRPCRouter } from '@/deps/trpc/trpc';
import { z } from 'zod';

const eventCreateSchema = z.object({
	title: z.string(),
	description: z.string(),
	date: z.date(),
	location: z.string(),
	capacity: z.number().int().min(1),
	price: z.number().int().min(0),
	externalReservationUrl: z.string().optional().nullable()
});

const eventUpdateSchema = eventCreateSchema.partial();

export const eventRouter = createTRPCRouter({
	list: publicProcedure.query(async ({ ctx }) => {
		return ctx.eventService.listEvents();
	}),
	get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
		return ctx.eventService.getEvent(input);
	}),
	create: publicProcedure
		.input(eventCreateSchema)
		.mutation(async ({ ctx, input }) => {
			return ctx.eventService.createEvent(input);
		}),
	update: publicProcedure
		.input(z.object({ id: z.string(), data: eventUpdateSchema }))
		.mutation(async ({ ctx, input }) => {
			return ctx.eventService.updateEvent(input.id, input.data);
		}),
	delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
		await ctx.eventService.deleteEvent(input);
		return { success: true };
	}),
	getWithReservations: publicProcedure
		.input(z.string())
		.query(async ({ ctx, input }) => {
			return ctx.eventService.getEventWithReservations(input);
		}),
	getDaysUntilNextEvent: publicProcedure.query(async ({ ctx }) => {
		return ctx.eventService.getDaysUntilNextEvent();
	})
});
