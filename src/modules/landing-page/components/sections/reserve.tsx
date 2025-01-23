'use client';

import { Container } from '@/global/components/container';
import { ContentPadding } from '@/global/components/content-padding';
import { api } from '@/lib/trpc/react';
import { format } from 'date-fns';

export const ReserveSection = () => {
	const { data: events } = api.event.list.useQuery();

	return (
		<Container className="py-10">
			<ContentPadding>Reserve</ContentPadding>
			<ContentPadding>Upcoming Events:</ContentPadding>
			<ContentPadding>
				{events?.map((event) => (
					<div key={event.id}>
						{event.title} {format(event.date, 'PPP')}
					</div>
				))}
			</ContentPadding>
		</Container>
	);
};
