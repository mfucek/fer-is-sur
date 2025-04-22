import { publicProcedure } from '@/deps/trpc/procedures';
import { couponPurchaseSchema } from '../../schemas/coupon-purchase-schema';
import { generateLegalVoucherCode } from '../helpers/generate-legal-voucher-code';

export const purchaseCouponProcedure = publicProcedure
	.input(couponPurchaseSchema)
	.mutation(async ({ ctx, input }) => {
		const { email, amount } = input;

		const finalCode = await generateLegalVoucherCode(ctx.db);

		const coupon = await ctx.db.coupon.create({
			data: {
				code: finalCode.toUpperCase(),
				creatorByEmail: email,
				discountAmount: amount,
				maxUses: 1,
				expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
			}
		});

		return coupon;
	});
