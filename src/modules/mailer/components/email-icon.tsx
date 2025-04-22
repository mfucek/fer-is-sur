import { env } from '@/env';
import { IconName } from '@/global/components/icon';
import React from 'react';

export const Icon: React.FC<{
	icon: IconName;
	size?: number;
	color?: string;
	backgroundColor?: string;
}> = ({ icon, size = 24, color = '#000', backgroundColor = '#fff' }) => {
	return (
		<img
			src={`${env.NEXT_PUBLIC_STRIPE_URL}/api/og?size=${size}&color=${color?.replace('#', '%23')}&bg=${backgroundColor?.replace('#', '%23')}&icon=${icon}`}
			width={size}
			height={size}
		/>
	);
};
