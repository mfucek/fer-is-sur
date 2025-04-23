'use client';

import { api } from '@/deps/trpc/react';
import { EventSection } from '../event-section';
import { LandingHeading } from '../landing-heading';

export const PastEventsSection = () => {
	const { data: events } = api.event.showcase.list.useQuery();

	return (
		<>
			<div className="flex flex-col w-full gap-20 py-20">
				<LandingHeading
					title="Slikarske Radionice"
					description={`Cool motivi, dobro društvo, loše fore, stručno vodstvo, ugodna atmosfera rezultat svega toga je osmijeh na licu i remek-djelo na Vašem zidu.\nNije potrebno nikakvo predznanje, a za slikarske materijale ćemo se pobrinuti mi.`}
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
