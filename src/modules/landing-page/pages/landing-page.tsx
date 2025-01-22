import { type FC } from 'react';
import { FooterSection } from '../components/sections/footer';
import { GalleriesSection } from '../components/sections/galleries';
import { HeroSection } from '../components/sections/hero';
import { ReserveSection } from '../components/sections/reserve';

export const LandingPage: FC = () => {
	return (
		<div className="flex flex-col items-center">
			<HeroSection />
			<GalleriesSection />
			<ReserveSection />
			<FooterSection />
		</div>
	);
};
