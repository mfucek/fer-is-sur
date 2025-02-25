import { type FC } from 'react';
import { AboutSection } from '../components/sections/about';
import { FooterSection } from '../components/sections/footer';
import { HeroSection } from '../components/sections/hero';
import { PastEventsSection } from '../components/sections/past-events';
import { ReserveSection } from '../components/sections/reserve';

export const LandingPage: FC = () => {
	return (
		<div className="flex-page">
			<HeroSection />
			<PastEventsSection />
			<AboutSection />
			<ReserveSection />
			<FooterSection />
		</div>
	);
};
