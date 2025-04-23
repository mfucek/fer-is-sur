import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { env } from '@/env';
import { handleCouponPurchaseSuccess } from './handlers/handle-coupon-purchase-success';
import { handleEventReservationSuccess } from './handlers/handle-event-reservation-success';

const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
	apiVersion: '2025-02-24.acacia'
});

export const postHandler = async (request: Request) => {
	console.log('\nSTRIPE WEBHOOK\n');

	try {
		const body = await request.text();
		const sig = request.headers.get('stripe-signature')!;

		const event = await stripe.webhooks.constructEventAsync(
			body,
			sig,
			webhookSecret
		);

		console.log(event.type);

		switch (event.type) {
			case 'charge.succeeded': {
				break;
			}
			case 'checkout.session.completed': {
				const paymentIntentId = event.data.object.payment_intent as string;

				const metadata = event.data.object.metadata!;

				const { reservationId } = metadata;

				if (reservationId) {
					await handleEventReservationSuccess({
						reservationId: reservationId,
						paymentIntentId: paymentIntentId
					});
					break;
				}

				const { creatorEmail, recipientEmail, amountCents, recepientMessage } =
					metadata;

				if (creatorEmail && amountCents) {
					await handleCouponPurchaseSuccess({
						creatorEmail: creatorEmail,
						amountCents: Number(amountCents),
						recipientEmail: recipientEmail,
						recepientMessage: recepientMessage
					});
					break;
				}

				console.error(
					'[error] Unhandled case for following object: ',
					event.data.object
				);
				break;
			}
			default: {
				console.error(`Unhandled event type ${event.type}`);
				break;
			}
		}

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
};
