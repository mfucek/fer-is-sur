import { stripe } from '../../stripe';

export const refundPayment = async (
	paymentIntentId: string,
	amount: number
) => {
	const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

	const refund = await stripe.refunds.create({
		payment_intent: paymentIntentId,
		amount: amount
	});

	return refund;
};
