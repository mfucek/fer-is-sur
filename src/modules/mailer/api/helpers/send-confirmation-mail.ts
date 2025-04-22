import { sendMailWithHTML } from '@/deps/nodemailer/send-mail-with-html';
import { env } from '@/env';
import { billingItem } from '@/modules/mailer/template/billingItem';
import { footer } from '@/modules/mailer/template/footer';
import { reservationDetails } from '@/modules/mailer/template/reservationDetails';
import { reservationSuccessCard } from '@/modules/mailer/template/reservationSuccessCard';
import { wrapper } from '@/modules/mailer/template/wrapper';
import { Coupon, Event, Reservation } from '@prisma/client';

export const sendConfirmationMail = async (
	reservation: Reservation,
	event: Event,
	coupon?: Coupon
) => {
	const amountPaid = reservation.totalPrice / 100;
	const eventCost = event.price * reservation.quantity;

	const discountAmount = eventCost - amountPaid;

	await sendMailWithHTML({
		subject: `Rezervacija potvrđena - ${event.title}`,
		toEmail: reservation.email,
		rawHtml: wrapper(
			reservationSuccessCard({
				title: event.title,
				location: event.location,
				date: event.date
			}),
			reservationDetails(
				{
					totalPrice: reservation.totalPrice / 100,
					cancellationUrl: `${env.NEXT_PUBLIC_URL}/cancel/${reservation.id}`
				},
				billingItem({
					title: 'Rezervacija termina',
					subtitle:
						reservation.quantity === 1
							? '1 osoba'
							: `${reservation.quantity} osobe`,
					price: event.price
				}),
				discountAmount > 0 && coupon
					? billingItem({
							title: 'Kupon',
							subtitle: coupon.code ?? 'popust',
							price: -discountAmount
						})
					: ''
			),
			footer()
		)
	});
};
