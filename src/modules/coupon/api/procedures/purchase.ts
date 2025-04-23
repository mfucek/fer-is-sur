import { generateCouponCheckoutSessionURL } from '@/deps/stripe/api/helpers/generate-coupon-checkout-session-url';
import { publicProcedure } from '@/deps/trpc/procedures';
import { couponPurchaseSchema } from '../../schemas/coupon-purchase-schema';

export const purchaseCouponProcedure = publicProcedure
	.input(couponPurchaseSchema)
	.mutation(async ({ ctx, input }) => {
		const { creatorEmail, recipientEmail, amount, recepientMessage } = input;

		const paymentUrl = await generateCouponCheckoutSessionURL({
			amountCents: amount * 100,
			creatorEmail: creatorEmail,
			recipientEmail: recipientEmail,
			recepientMessage: recepientMessage
		});

		return { paymentUrl };
	});
