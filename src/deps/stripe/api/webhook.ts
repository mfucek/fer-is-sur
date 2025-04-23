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
	console.log('\n=== STRIPE WEBHOOK START ===\n');
	console.log('Request URL:', request.url);
	console.log(
		'Request headers:',
		JSON.stringify(Object.fromEntries(request.headers.entries()), null, 2)
	);

	try {
		const clonedRequest = request.clone();
		const rawBody = await clonedRequest.text();
		const signature = request.headers.get('stripe-signature');

		if (!signature) {
			console.error('❌ No stripe signature found in request headers');
			return NextResponse.json(
				{ error: 'No signature found' },
				{ status: 400 }
			);
		}

		console.log('🔑 Webhook secret length:', webhookSecret.length);

		// Construct and verify the event
		const event = await stripe.webhooks.constructEventAsync(
			rawBody,
			signature,
			webhookSecret
		);

		console.log('✅ Successfully constructed Stripe event');

		switch (event.type) {
			case 'checkout.session.completed': {
				const paymentIntentId = event.data.object.payment_intent as string;

				const metadata = event.data.object.metadata!;

				const { reservationId } = metadata;

				if (reservationId) {
					await handleEventReservationSuccess({
						reservationId: reservationId,
						paymentIntentId: paymentIntentId
					});
					console.log(
						`✅ Successfully processed event reservation - ${reservationId}`
					);
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
					console.log(
						`✅ Successfully processed coupon purchase - ${creatorEmail}`
					);
					break;
				}

				console.error(
					'❌ Unhandled case for following object: ',
					JSON.stringify(event.data.object, null, 2)
				);
				break;
			}
			default: {
				console.error(`❌ Unhandled event type ${event.type}`);
				break;
			}
		}

		console.log('\n=== STRIPE WEBHOOK END ✅ ===\n');
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (err) {
		const error = err as Stripe.errors.StripeError;
		console.error('❌ Full error:', error);
		console.error('\n=== STRIPE WEBHOOK END ❌ ===\n');

		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
};
