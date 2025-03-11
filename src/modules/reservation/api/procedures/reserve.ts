import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { generateCheckoutSessionURL } from '@/deps/stripe/api/helpers';
import { publicProcedure } from '@/deps/trpc/procedures';
import { getFileDownloadUrl } from '@/modules/file/helpers/get-download-url';
import { eventReserveSchema } from '../../schemas/event-reserve-schema';

export const reserveProcedure = publicProcedure
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
			},
			include: {
				Reservations: true
			}
		});

		if (!event) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Event not found'
			});
		}

		// Capacity handling
		const remainingCapacity =
			event.capacity -
			event.Reservations.filter(
				(reservation) => reservation.reservationStatus === 'CONFIRMED'
			).reduce((acc, reservation) => acc + reservation.quantity, 0);

		if (details.quantity > remainingCapacity) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: `Ima samo ${remainingCapacity} slobodnih mjesta.`
			});
		}

		// Coupon handling
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
				(event.price * details.quantity * (100 - percentDiscount)) / 100 -
					amountDiscount
			) * 100;

		console.log(
			event.price,
			percentDiscount,
			amountDiscount,
			details.quantity,
			totalPriceCents
		);

		const reservation = await db.reservation.create({
			data: {
				eventId: eventId,
				totalPrice: totalPriceCents,
				...(couponId ? { couponId: couponId } : {}),
				paymentStatus: 'NOT_PAID',
				reservationStatus: 'PENDING',
				email: details.email,
				quantity: details.quantity
			}
		});

		const coverImage = await db.eventCover.findFirst({
			where: {
				eventId: eventId
			},
			include: {
				Image: true
			}
		});

		let imageUrl: string | null = null;
		if (coverImage && coverImage.Image) {
			imageUrl = await getFileDownloadUrl(coverImage.Image.key);
		}

		// generate stripe URL
		const paymentUrl = await generateCheckoutSessionURL({
			totalAmountCents: totalPriceCents,
			quantity: details.quantity,
			reservationId: reservation.id,
			imageUrl: imageUrl
		});

		return { reservation, paymentUrl };
	});
