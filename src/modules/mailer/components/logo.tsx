import { env } from '@/env';

export const Logo = () => {
	return <img src={env.NEXT_PUBLIC_STRIPE_URL + '/cover.png'} height={32} />;
};
