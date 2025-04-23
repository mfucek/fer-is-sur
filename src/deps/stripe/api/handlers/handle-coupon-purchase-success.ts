import { db } from '@/deps/db';
import { generateLegalVoucherCode } from '@/modules/coupon/api/helpers/generate-legal-voucher-code';
import { sendCouponGiftedMail } from '@/modules/mailer/api/helpers/send-coupon-gifted-mail';
import { sendCouponPurchasedMail } from '@/modules/mailer/api/helpers/send-coupon-purchased-mail';

export const handleCouponPurchaseSuccess = async ({
	creatorEmail,
	amountCents,
	recipientEmail,
	recepientMessage
}: {
	creatorEmail: string;
	amountCents: number;
	recipientEmail?: string;
	recepientMessage?: string;
}) => {
	const code = await generateLegalVoucherCode(db);

	const coupon = await db.coupon.create({
		data: {
			code: code.toUpperCase(),
			discountAmount: amountCents,
			creatorByEmail: creatorEmail,
			expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 year,
			maxUses: 1
		}
	});

	console.log(`✅ Created coupon - ${coupon.code}`);

	await sendCouponPurchasedMail({ coupon: coupon });

	console.log('✉️ Sent coupon purchased mail');

	if (recipientEmail) {
		await sendCouponGiftedMail({
			coupon: coupon,
			recipientEmail: recipientEmail,
			message: recepientMessage
		});

		console.log('✉️ Sent coupon gifted mail');
	}
};
