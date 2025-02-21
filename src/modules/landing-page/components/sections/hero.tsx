import { Container } from '@/global/components/container';
import { ContentPadding } from '@/global/components/content-padding';

export const HeroSection = () => {
	return (
		<Container className="py-20">
			<ContentPadding>
				<h1 className="display-1 text-center">CRNI MAG</h1>
			</ContentPadding>
		</Container>
	);
};
