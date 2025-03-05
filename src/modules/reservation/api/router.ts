import { authedProcedure, publicProcedure } from '@/deps/trpc/procedures';
import { createTRPCRouter } from '@/deps/trpc/trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { eventReserveSchema } from '../schemas/event-reserve-schema';

export const reservationRouter = createTRPCRouter({
	list: authedProcedure.query(async ({ ctx }) => {
		const reservations = await ctx.db.reservation.findMany();

		return reservations;
	}),

	listByCoupon: publicProcedure
		.input(
			z.object({
				couponId: z.string()
			})
		)
		.query(async ({ ctx, input }) => {
			const reservations = await ctx.db.reservation.findMany({
				where: { couponId: input.couponId }
			});

			return reservations;
		}),

	listByEvent: publicProcedure
		.input(
			z.object({
				eventId: z.string()
			})
		)
		.query(async ({ ctx, input }) => {
			const reservations = await ctx.db.reservation.findMany({
				where: { eventId: input.eventId }
			});

			return reservations;
		}),

	reserve: publicProcedure
		.input(
			z.object({
				eventId: z.string(),
				details: eventReserveSchema
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { db } = ctx;
			const { eventId, details } = input;

			const event = await db.event.findUnique({
				where: {
					id: eventId
				}
			});

			if (!event) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Event not found'
				});
			}

			let percentDiscount = 0;
			let amountDiscount = 0;

			let couponId: string | null = null;
			if (details.couponCode) {
				const coupon = await db.coupon.findFirst({
					where: {
						code: details.couponCode
					},
					include: {
						_count: {
							select: {
								Reservations: true
							}
						}
					}
				});

				if (!coupon) {
					throw new TRPCError({
						code: 'NOT_FOUND',
						message: 'Coupon not found.'
					});
				}

				if (coupon.expiresAt && coupon.expiresAt < new Date()) {
					throw new TRPCError({
						code: 'BAD_REQUEST',
						message: 'The coupon has expired.'
					});
				}

				if (
					coupon.maxUses !== 0 &&
					coupon.maxUses <= coupon._count.Reservations
				) {
					throw new TRPCError({
						code: 'BAD_REQUEST',
						message: 'The coupon has reached its maximum usage.'
					});
				}

				couponId = coupon.id;

				percentDiscount = coupon.discountPercent ?? 0;
				amountDiscount = coupon.discountAmount ?? 0;
			}

			const totalPriceCents =
				Math.max(
					0,
					(event.price * (100 - percentDiscount)) / 100 - amountDiscount
				) * 100;

			const reservation = await ctx.db.reservation.create({
				data: {
					eventId: eventId,
					totalPrice: totalPriceCents,
					...(couponId ? { couponId: couponId } : {}),
					paymentStatus: 'NOT_PAID',
					reservationStatus: 'PENDING',
					email: details.email
				}
			});

			// generate stripe URL

			return reservation;
		})
});
