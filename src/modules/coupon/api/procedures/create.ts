import { authedProcedure } from '@/deps/trpc/procedures';
import { couponCreateSchema } from '../../schemas/coupon-create-schema';
import { generateLegalVoucherCode } from '../helpers/generate-legal-voucher-code';

export const createCouponProcedure = authedProcedure
	.input(couponCreateSchema)
	.mutation(async ({ ctx, input }) => {
		const { code, discountPercent, discountAmount, expiresAt, maxUses } = input;

		let finalCode = code ?? '';

		if (!code) {
			console.log('no code was provided, generating legal voucher code');

			finalCode = await generateLegalVoucherCode(ctx.db);
		}

		const couponRaw = await ctx.db.coupon.create({
			data: {
				code: finalCode.toUpperCase(),
				discountPercent,
				discountAmount,
				maxUses: maxUses ?? 0,
				expiresAt
			}
		});

		const coupon = {
			id: couponRaw.id,
			code: couponRaw.code,
			discountPercent: couponRaw.discountPercent,
			discountAmount: couponRaw.discountAmount
				? couponRaw.discountAmount / 100
				: null,
			maxUses: couponRaw.maxUses,
			expiresAt: couponRaw.expiresAt
		};

		return coupon;
	});
