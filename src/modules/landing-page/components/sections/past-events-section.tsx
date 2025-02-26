'use client';

import { api } from '@/deps/trpc/react';
import { EventSection } from '../event-section';
import { HeadingSection } from '../heading-section';

export const PastEventsSection = () => {
	const { data: events } = api.event.listShowcase.useQuery();

	return (
		<>
			<HeadingSection
				title="Slikarske Radionice"
				description="Ovo je neki tekst o povijesti studija bla bla. Poanta je da u par natuknica posjetitelj dobije confidence da se rezervira."
				id="past-events"
			/>

			{events?.map((event, index) => (
				<EventSection
					key={event.id}
					event={event}
					side={index % 2 === 0 ? 'left' : 'right'}
				/>
			))}
		</>
	);
};
