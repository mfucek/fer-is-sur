import { publicProcedure } from '@/deps/trpc/procedures';
import { createTRPCRouter } from '@/deps/trpc/trpc';
import { z } from 'zod';

const reservationCreateSchema = z.object({
	email: z.string().email(),
	quantity: z.number().int().min(1),
	eventId: z.string(),
	totalPrice: z.number().int().min(0),
	reservationStatus: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED']),
	paymentStatus: z.enum(['NOT_PAID', 'PAID', 'REFUNDED']),
	paymentIntentId: z.string().optional().nullable(),
	couponId: z.string().optional().nullable()
});

const reservationUpdateSchema = reservationCreateSchema.partial();

export const reservationRouter = createTRPCRouter({
	list: publicProcedure.query(async ({ ctx }) => {
		return ctx.reservationService.listReservations();
	}),
	get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
		return ctx.reservationService.getReservation(input);
	}),
	create: publicProcedure
		.input(reservationCreateSchema)
		.mutation(async ({ ctx, input }) => {
			return ctx.reservationService.createReservation(input);
		}),
	update: publicProcedure
		.input(z.object({ id: z.string(), data: reservationUpdateSchema }))
		.mutation(async ({ ctx, input }) => {
			return ctx.reservationService.updateReservation(input.id, input.data);
		}),
	delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
		await ctx.reservationService.deleteReservation(input);
		return { success: true };
	}),
	listByEventId: publicProcedure
		.input(z.string())
		.query(async ({ ctx, input }) => {
			return ctx.reservationService.listByEventId(input);
		})
});
