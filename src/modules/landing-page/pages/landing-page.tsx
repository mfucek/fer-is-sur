import { type FC } from 'react';
import { AboutSection } from '../components/sections/about-section';
import { FooterSection } from '../components/sections/footer-section';
import { HeroSection } from '../components/sections/hero-section';
import { PastEventsSection } from '../components/sections/past-events-section';
import { ReserveSection } from '../components/sections/reserve-section';

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
