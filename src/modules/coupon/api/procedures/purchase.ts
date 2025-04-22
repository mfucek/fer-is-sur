import { publicProcedure } from '@/deps/trpc/procedures';
import { couponPurchaseSchema } from '../../schemas/coupon-purchase-schema';
import { generateLegalVoucherCode } from '../helpers/generate-legal-voucher-code';

export const purchaseCouponProcedure = publicProcedure
	.input(couponPurchaseSchema)
	.mutation(async ({ ctx, input }) => {
		const { email, amount } = input;

		const finalCode = await generateLegalVoucherCode(ctx.db);

		const couponRaw = await ctx.db.coupon.create({
			data: {
				code: finalCode.toUpperCase(),
				creatorByEmail: email,
				discountAmount: amount,
				maxUses: 1,
				expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
			}
		});

		const coupon = {
			id: couponRaw.id,
			code: couponRaw.code,
			discountAmount: couponRaw.discountAmount
				? couponRaw.discountAmount / 100
				: null,
			maxUses: couponRaw.maxUses,
			expiresAt: couponRaw.expiresAt
		};

		return coupon;
	});
