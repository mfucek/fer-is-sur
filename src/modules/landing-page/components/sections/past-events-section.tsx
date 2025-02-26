'use client';

import { api } from '@/deps/trpc/react';
import { EventSection } from '../event-section';
import { LandingHeading } from '../landing-heading';

export const PastEventsSection = () => {
	const { data: events } = api.event.listShowcase.useQuery();

	return (
		<>
			<div className="flex flex-col w-full gap-20 py-20">
				<LandingHeading
					title="Slikarske Radionice"
					description="Ovo je neki tekst o povijesti studija bla bla. Poanta je da u par natuknica posjetitelj dobije confidence da se rezervira."
					id="past-events"
				/>

				<div className="flex flex-col gap-20 w-full items-center">
					{events?.map((event, index) => (
						<EventSection
							key={event.id}
							event={event}
							side={index % 2 === 0 ? 'left' : 'right'}
						/>
					))}
				</div>
			</div>
		</>
	);
};
