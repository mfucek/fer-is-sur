import { sendMailWithHTML } from '@/deps/nodemailer/send-mail-with-html';
import { env } from '@/env';
import { billingItem } from '@/modules/mailer/template/billing-item';
import { footer } from '@/modules/mailer/template/footer';
import { reservationDetails } from '@/modules/mailer/template/reservation-details';
import { reservationSuccessCard } from '@/modules/mailer/template/reservation-success-card';
import { wrapper } from '@/modules/mailer/template/wrapper';
import { Coupon, Event, Reservation } from '@prisma/client';

export const sendReservationCreatedMail = async (
	reservation: Reservation,
	event: Event,
	coupon?: Coupon
) => {
	const eventCost = (event.price / 100) * reservation.quantity;
	const amountPaid = reservation.totalPrice / 100;

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
					cancellationUrl: `${env.NEXT_PUBLIC_URL}/cancel/${reservation.id}`,
					message: 'Hvala na povjerenju, veselimo se druzenju!'
				},
				billingItem({
					title: 'Rezervacija termina',
					subtitle:
						reservation.quantity === 1
							? '1 osoba'
							: `${reservation.quantity} osobe`,
					price: eventCost
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
