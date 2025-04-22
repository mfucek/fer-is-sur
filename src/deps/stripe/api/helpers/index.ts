import Stripe from 'stripe';

import { env } from '@/env';

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
	apiVersion: '2025-02-24.acacia'
});

const fallbackImageUrl = env.NEXT_PUBLIC_STRIPE_URL + '/cover.png';

export const generateCheckoutSessionURL = async ({
	title,
	reservationId,
	undiscountedPrice,
	finalPrice,
	quantity,
	imageUrl
}: {
	title: string;
	reservationId: string;
	undiscountedPrice: number;
	finalPrice: number;
	quantity: number;
	imageUrl?: string | null;
}) => {
	const quantityString = quantity === 1 ? '1 osobu' : `${quantity} osobe`;

	const discountAmount = undiscountedPrice - finalPrice;
	const discountAmountString =
		discountAmount > 0 ? ` - Popust: ${discountAmount / 100} EUR` : '';

	const session = await stripe.checkout.sessions.create({
		mode: 'payment',
		line_items: [
			{
				price_data: {
					unit_amount_decimal: finalPrice.toString(),
					tax_behavior: 'exclusive',
					currency: 'eur',
					product_data: {
						name: `Rezervacija - ${title}`,
						description: `Rezervacija za likovnu radionicu za ${quantityString}${discountAmountString}`,
						images: [imageUrl ?? fallbackImageUrl]
					}
				},
				quantity: 1
			}
		],
		submit_type: 'book',
		success_url: `${env.NEXT_PUBLIC_URL}/success?reservationId=${reservationId}`,
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
