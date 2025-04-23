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
	console.log('Request method:', request.method);
	console.log(
		'Request headers:',
		JSON.stringify(Object.fromEntries(request.headers.entries()), null, 2)
	);

	try {
		// Clone the request to ensure we have access to the raw body
		const clonedRequest = request.clone();

		// Get the raw body as text
		const rawBody = await clonedRequest.text();
		console.log('Raw body length:', rawBody.length);
		console.log('Raw body preview:', rawBody.substring(0, 100) + '...');

		// Get the Stripe signature from headers
		const signature = request.headers.get('stripe-signature');
		console.log('Stripe signature:', signature);

		if (!signature) {
			console.error('❌ No stripe signature found in request headers');
			return NextResponse.json(
				{ error: 'No signature found' },
				{ status: 400 }
			);
		}

		console.log('🔑 Webhook secret length:', webhookSecret.length);
		console.log(
			'🔑 Webhook secret preview:',
			webhookSecret.substring(0, 4) +
				'...' +
				webhookSecret.substring(webhookSecret.length - 4)
		);

		// Construct and verify the event
		console.log('Attempting to construct Stripe event...');
		const event = await stripe.webhooks.constructEventAsync(
			rawBody,
			signature,
			webhookSecret
		);

		console.log('✅ Successfully constructed Stripe event');
		console.log('Event type:', event.type);
		console.log('Event ID:', event.id);

		switch (event.type) {
			case 'charge.succeeded': {
				console.log('Processing charge.succeeded event');
				break;
			}
			case 'checkout.session.completed': {
				console.log('Processing checkout.session.completed event');
				const paymentIntentId = event.data.object.payment_intent as string;
				console.log('Payment Intent ID:', paymentIntentId);

				const metadata = event.data.object.metadata!;
				console.log('Event metadata:', metadata);

				const { reservationId } = metadata;

				if (reservationId) {
					console.log(
						'Processing event reservation success for reservationId:',
						reservationId
					);
					await handleEventReservationSuccess({
						reservationId: reservationId,
						paymentIntentId: paymentIntentId
					});
					console.log('✅ Successfully processed event reservation');
					break;
				}

				const { creatorEmail, recipientEmail, amountCents, recepientMessage } =
					metadata;

				if (creatorEmail && amountCents) {
					console.log(
						'Processing coupon purchase success for creator:',
						creatorEmail
					);
					await handleCouponPurchaseSuccess({
						creatorEmail: creatorEmail,
						amountCents: Number(amountCents),
						recipientEmail: recipientEmail,
						recepientMessage: recepientMessage
					});
					console.log('✅ Successfully processed coupon purchase');
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

		console.log('\n=== STRIPE WEBHOOK END - SUCCESS ===\n');
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (err) {
		const error = err as Stripe.errors.StripeError;
		console.error('\n❌ STRIPE WEBHOOK ERROR');
		console.error('Error type:', error.type);
		console.error('Error message:', error.message);
		if (error.raw) {
			console.error('Raw error:', error.raw);
		}
		console.error('Full error:', error);
		console.error('\n=== STRIPE WEBHOOK END - ERROR ===\n');

		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
};
