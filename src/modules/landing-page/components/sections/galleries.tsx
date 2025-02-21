'use client';

import { Container } from '@/global/components/container';
import { ContentPadding } from '@/global/components/content-padding';
import { api } from '@/lib/trpc/react';
import { EventGallery } from '../event-gallery';

export const GalleriesSection = () => {
	const { data: events } = api.event.listShowcase.useQuery();

	return (
		<>
			<Container>
				<ContentPadding>
					<h2 className="display-3 text-center">Prethodne radionice</h2>
				</ContentPadding>
			</Container>
			<Container className="py-10 flex flex-col gap-40">
				{events?.map((event, index) => (
					<EventGallery
						key={event.id}
						event={event}
						side={index % 2 === 0 ? 'left' : 'right'}
					/>
				))}
			</Container>
		</>
	);
};
