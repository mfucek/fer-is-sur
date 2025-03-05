import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { authedProcedure } from '@/deps/trpc/procedures';

export const deleteProcedure = authedProcedure
	.input(z.object({ id: z.string() }))
	.mutation(async ({ ctx, input }) => {
		const { db } = ctx;
		const { id } = input;

		const coupon = await db.coupon.findUnique({
			where: { id },
			include: {
				_count: {
					select: {
						Reservations: true
					}
				}
			}
		});

		if (!coupon) {
			throw new TRPCError({ code: 'NOT_FOUND', message: 'Coupon not found' });
		}

		if (coupon._count.Reservations > 0) {
			db.coupon.update({
				where: { id },
				data: {
					maxUses: coupon._count.Reservations
				}
			});

			return {
				deleted: false,
				updated: true
			};
		}

		await db.coupon.delete({ where: { id } });

		return {
			deleted: true,
			updated: false
		};
	});
