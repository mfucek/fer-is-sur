import { sendMailWithHTML } from '@/deps/nodemailer/send-mail-with-html';
import { billingItem } from '@/modules/mailer/template/billing-item';
import { footer } from '@/modules/mailer/template/footer';
import { reservationDetails } from '@/modules/mailer/template/reservation-details';
import { wrapper } from '@/modules/mailer/template/wrapper';
import { formatPrice } from '@/utils/format-price';
import { Coupon } from '@prisma/client';
import { couponPurchaseCard } from '../../template/coupon-purchase-card';

export const sendCouponPurchasedMail = async ({
	coupon
}: {
	coupon: Coupon;
}) => {
	const couponCost = coupon.discountAmount! / 100;

	await sendMailWithHTML({
		subject: `Kupon kupljen`,
		toEmail: coupon.creatorByEmail!,
		rawHtml: wrapper(
			couponPurchaseCard({
				code: coupon.code,
				value: couponCost,
				expiryDate: coupon.expiresAt!
			}),
			reservationDetails(
				{
					totalPrice: couponCost,
					message:
						'Hvala na kupnji kupona, nadamo se da će razveseliti Vaše prijatelje ili bližnje!'
				},
				billingItem({
					title: 'Poklonski kupon',
					subtitle: `Vrijednosti do ${formatPrice(couponCost)} EUR`,
					price: couponCost
				})
			),
			footer()
		)
	});
};
