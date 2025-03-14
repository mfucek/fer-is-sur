import { env } from '@/env';

export const Logo = () => {
	return <img src={env.STRIPE_URL + '/cover.png'} height={32} />;
};
