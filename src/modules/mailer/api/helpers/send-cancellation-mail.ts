import { db } from '@/deps/db';
import { sendMailWithHTML } from '@/deps/nodemailer/send-mail-with-html';
import { env } from '@/env';
import { getFileDownloadUrl } from '@/modules/file/helpers/get-download-url';
import { cancellationSuggestionsCard } from '@/modules/mailer/template/cancellationSuggestionsCard';
import { footer } from '@/modules/mailer/template/footer';
import { reservationCancelledCard } from '@/modules/mailer/template/reservationCancelledCard';
import { suggestion } from '@/modules/mailer/template/suggestion';
import { wrapper } from '@/modules/mailer/template/wrapper';
import { Event, Reservation } from '@prisma/client';

export const sendCancellationMail = async (
	reservation: Reservation,
	event: Event
) => {
	const upcomingEventsRaw = await db.event.findMany({
		where: {
			date: {
				gt: new Date()
			}
		},
		include: {
			Reservations: true,
			CoverImage: {
				include: {
					Image: true
				}
			}
		},
		take: 4
	});

	const upcomingEvents = upcomingEventsRaw
		.filter((event) => event.id !== reservation.eventId)
		.slice(0, 3);

	await sendMailWithHTML({
		subject: `Rezervacija otkazana - ${event.title}`,
		toEmail: reservation.email,
		rawHtml: wrapper(
			reservationCancelledCard({
				title: event.title,
				location: event.location,
				date: event.date
			}),
			cancellationSuggestionsCard(
				...(await Promise.all(
					upcomingEvents.map(async (event) => {
						const remainingSpots =
							event.capacity -
							event.Reservations.filter(
								(reservation) => reservation.reservationStatus === 'CONFIRMED'
							).length;
						const imgSrc = event.CoverImage?.Image?.key
							? await getFileDownloadUrl(event.CoverImage.Image.key)
							: '';

						return suggestion({
							title: event.title,
							location: event.location,
							date: event.date,
							remainingSpots,
							imgSrc,
							reservationUrl: env.NEXT_PUBLIC_URL
						});
					})
				))
			),
			footer()
		)
	});
};
