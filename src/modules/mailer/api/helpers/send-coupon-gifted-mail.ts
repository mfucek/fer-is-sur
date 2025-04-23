import { db } from '@/deps/db';
import { sendMailWithHTML } from '@/deps/nodemailer/send-mail-with-html';
import { env } from '@/env';
import { getFileDownloadUrl } from '@/modules/file/helpers/get-download-url';
import { footer } from '@/modules/mailer/template/footer';
import { wrapper } from '@/modules/mailer/template/wrapper';
import { Coupon } from '@prisma/client';
import { couponGiftCard } from '../../template/coupon-gift-card';
import { eventSuggestionsCard } from '../../template/event-suggestions-card';
import { suggestion } from '../../template/suggestion';

export const sendCouponGiftedMail = async ({
	coupon,
	recipientEmail,
	message
}: {
	coupon: Coupon;
	recipientEmail: string;
	message?: string;
}) => {
	const couponCost = coupon.discountAmount! / 100;

	const upcomingEvents = await db.event.findMany({
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

	await sendMailWithHTML({
		subject: `Poklonski kupon`,
		toEmail: recipientEmail,
		rawHtml: wrapper(
			couponGiftCard({
				code: coupon.code,
				value: couponCost,
				expiryDate: coupon.expiresAt!
			}),
			eventSuggestionsCard(
				{
					message:
						message ??
						'Poklonjen Vam je poklonski kupon za likovne radionice. Istražite naše radionice i rezervirajte svoje mjesto.'
				},
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
							reservationUrl: `${env.NEXT_PUBLIC_URL}#reserve`
						});
					})
				))
			),
			footer()
		)
	});
};
