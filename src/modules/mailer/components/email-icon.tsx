import { env } from '@/env';
import { IconName } from '@/global/components/icon';
import React from 'react';

export const Icon: React.FC<{
	icon: IconName;
	size?: number;
	color?: string;
	backgroundColor?: string;
}> = ({ icon, size, color, backgroundColor }) => {
	return (
		<img
			src={`${env.STRIPE_URL}/api/og?size=${size}&color=${color?.replace('#', '%23')}&bg=${backgroundColor?.replace('#', '%23')}&icon=${icon}`}
			width={size}
			height={size}
		/>
	);
};
