import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { db } from '@/deps/db';
import { env } from '@/env';

const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

export const postHandler = async (request: Request) => {
	try {
		const body = await request.text();
		const sig = request.headers.get('stripe-signature')!;

		const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
			apiVersion: '2025-02-24.acacia'
		});

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
				// @ts-ignore
				const reservationId = event.data.object.metadata.reservationId;

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
						paymentStatus: 'PAID'
					}
				});

				break;
			}
			case 'checkout.session.async_payment_succeeded': {
				break;
			}
			case 'checkout.session.async_payment_failed': {
				break;
			}
			case 'checkout.session.expired': {
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
