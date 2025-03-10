import Stripe from 'stripe';

import { env } from '@/env';

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
	apiVersion: '2025-02-24.acacia'
});

export const generateCheckoutSessionURL = async ({
	reservationId,
	totalAmountCents,
	quantity
}: {
	reservationId: string;
	totalAmountCents: number;
	quantity: number;
}) => {
	const amountPerItem = (totalAmountCents / quantity).toString();

	const session = await stripe.checkout.sessions.create({
		mode: 'payment',
		line_items: [
			{
				price_data: {
					unit_amount_decimal: amountPerItem,
					tax_behavior: 'inclusive',
					currency: 'eur',
					product_data: {
						name: 'Event Reservation',
						description: 'Event Reservation',
						images: [
							env.STRIPE_URL + '/cover.png',
							env.STRIPE_URL + '/favicon.png'
						]
					}
				},
				quantity: quantity
			}
		],
		submit_type: 'book',
		success_url: 'https://crni-mag.studio',
		locale: 'hr',
		ui_mode: 'hosted',
		metadata: {
			reservationId
		}
	});

	if (!session.url) {
		throw new Error('Could not create checkout session');
	}

	return session.url;
};

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
