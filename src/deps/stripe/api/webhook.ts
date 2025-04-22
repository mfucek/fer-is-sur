import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { db } from '@/deps/db';
import { env } from '@/env';
import { sendConfirmationMail } from '@/modules/mailer/api/helpers/send-confirmation-mail';

const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
	apiVersion: '2025-02-24.acacia'
});

export const postHandler = async (request: Request) => {
	console.log('\n\nSTRIPE WEBHOOK\n\n');

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
				const reservationId = event.data.object.metadata!.reservationId;

				const paymentIntentId = event.data.object.payment_intent as string;

				if (!reservationId) {
					console.error('No reservation ID found');
					break;
				}

				console.log('reservationId: ', reservationId);
				console.log('updating reservation');

				const reservation = await db.reservation.update({
					where: {
						id: reservationId
					},
					data: {
						reservationStatus: 'CONFIRMED',
						paymentStatus: 'PAID',
						paymentIntentId: paymentIntentId
					},
					include: {
						Event: true,
						Coupon: true
					}
				});

				console.log('[SEND EMAIL]');

				await sendConfirmationMail(
					reservation,
					reservation.Event,
					reservation.Coupon ?? undefined
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
