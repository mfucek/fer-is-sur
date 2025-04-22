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
					code: details.couponCode.toUpperCase()
				},
				include: {
					Reservations: true
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

			const couponUses = coupon.Reservations.filter(
				(reservation) => reservation.reservationStatus === 'CONFIRMED'
			).length;
			const remainingUses =
				coupon.maxUses === 0 ? Infinity : coupon.maxUses - couponUses;

			if (remainingUses <= 0) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Kupon je već iskorišten.'
				});
			}

			if (remainingUses < details.quantity) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: `Kupon vrijedi za ${remainingUses} primjena, a želite rezervirati ${details.quantity} mjesta.`
				});
			}

			couponId = coupon.id;

			percentDiscount = coupon.discountPercent ?? 0;
			amountDiscount = coupon.discountAmount ?? 0;
		}

		const undiscountedTotalPriceCents = event.price * details.quantity;

		const discountedTotalPriceCents = Math.max(
			0,
			(undiscountedTotalPriceCents * (100 - percentDiscount)) / 100 -
				amountDiscount
		);

		console.log('event.price', event.price);

		console.log('undiscountedTotalPriceCents', undiscountedTotalPriceCents);

		console.log('percentDiscount', percentDiscount);
		console.log('amountDiscount', amountDiscount);
		console.log('details.quantity', details.quantity);
		console.log('discountedTotalPriceCents', discountedTotalPriceCents);

		const reservation = await db.reservation.create({
			data: {
				eventId: eventId,
				totalPrice: discountedTotalPriceCents,
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
			title: event.title,
			undiscountedPrice: undiscountedTotalPriceCents,
			finalPrice: discountedTotalPriceCents,
			quantity: details.quantity,
			reservationId: reservation.id,
			imageUrl: imageUrl
		});

		return { reservation, paymentUrl };
	});
