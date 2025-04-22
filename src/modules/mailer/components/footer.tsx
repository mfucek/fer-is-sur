import { env } from '@/env';
import { companyInfo } from '../constants/company-info';

export const Footer = () => {
	return (
		<div
			style={{ padding: '16px 0px', color: '#00000080', textAlign: 'center' }}
		>
			<img
				src={`${env.NEXT_PUBLIC_STRIPE_URL}/assets/images/hero-desaturated.png`}
			/>
			<p>{companyInfo.address}</p>
			<p>
				Bitte antworten Sie nicht auf diese Email. Wenn Sie Fragen haben,
				kontaktieren Sie uns bitte per Email: {companyInfo.email} oder Telefon:{' '}
				{companyInfo.phone}.
			</p>
		</div>
	);
};
