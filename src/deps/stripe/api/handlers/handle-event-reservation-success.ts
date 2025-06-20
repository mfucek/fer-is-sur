import { db } from '@/deps/db';
import { sendReservationCreatedMail } from '@/modules/mailer/api/helpers/send-reservation-created-mail';

export const handleEventReservationSuccess = async ({
	reservationId,
	paymentIntentId
}: {
	reservationId: string;
	paymentIntentId: string;
}) => {
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

	console.log('✅ Updated reseration status');

	await sendReservationCreatedMail(
		reservation,
		reservation.Event,
		reservation.Coupon ?? undefined
	);

	console.log('✉️ Sent reservation creation confirmation mail');
};
