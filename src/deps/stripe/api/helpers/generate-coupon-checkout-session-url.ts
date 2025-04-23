import { env } from '@/env';
import { formatPrice } from '@/utils/format-price';
import { stripe } from '../../stripe';

export const generateCouponCheckoutSessionURL = async ({
	amountCents,
	creatorEmail,
	recipientEmail,
	recepientMessage
}: {
	amountCents: number;
	creatorEmail: string;
	recipientEmail: string;
	recepientMessage?: string;
}) => {
	const session = await stripe.checkout.sessions.create({
		mode: 'payment',
		line_items: [
			{
				price_data: {
					unit_amount_decimal: amountCents.toString(),
					tax_behavior: 'exclusive',
					currency: 'eur',
					product_data: {
						name: `Kupnja kupona`,
						description: `Kupnja poklonskog kupona za ${recipientEmail} u vrijednosti ${formatPrice(amountCents / 100)} EUR`,
						images: [env.NEXT_PUBLIC_STRIPE_URL + '/cover.png']
					}
				},
				quantity: 1
			}
		],
		submit_type: 'pay',
		success_url: `${env.NEXT_PUBLIC_URL}/success`,
		locale: 'hr',
		ui_mode: 'hosted',
		metadata: {
			creatorEmail,
			recipientEmail,
			amountCents,
			...(recepientMessage ? { recepientMessage } : {})
		}
	});

	if (!session.url) {
		throw new Error('Could not create checkout session');
	}

	return session.url;
};
