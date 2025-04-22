import { publicProcedure } from '@/deps/trpc/procedures';
import { getFileDownloadUrl } from '@/modules/file/helpers/get-download-url';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const getByIdProcedure = publicProcedure
	.input(z.object({ reservationId: z.string() }))
	.query(async ({ ctx, input }) => {
		const { reservationId } = input;
		const { db } = ctx;

		const reservationRaw = await db.reservation.findUnique({
			where: {
				id: reservationId
			},
			include: {
				Event: {
					include: {
						CoverImage: {
							include: {
								Image: true
							}
						}
					}
				}
			}
		});

		if (!reservationRaw) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Reservation not found'
			});
		}

		const reservation = {
			id: reservationRaw.id,
			createdAt: reservationRaw.createdAt,
			email: reservationRaw.email,
			quantity: reservationRaw.quantity,
			totalPrice: reservationRaw.totalPrice,
			reservationStatus: reservationRaw.reservationStatus,
			paymentStatus: reservationRaw.paymentStatus
		};

		const coverImageKey = reservationRaw.Event.CoverImage?.Image?.key;
		const coverImageUrl = coverImageKey
			? await getFileDownloadUrl(coverImageKey)
			: null;

		const event = {
			id: reservationRaw.Event.id,
			createdAt: reservationRaw.Event.createdAt,
			updatedAt: reservationRaw.Event.updatedAt,
			description: reservationRaw.Event.description,
			title: reservationRaw.Event.title,
			date: reservationRaw.Event.date,
			location: reservationRaw.Event.location,
			capacity: reservationRaw.Event.capacity,
			price: reservationRaw.Event.price,
			coverUrl: coverImageUrl
		};

		return { reservation, event };
	});
