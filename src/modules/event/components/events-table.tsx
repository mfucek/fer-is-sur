'use client';

import { api } from '@/lib/trpc/react';

export const EventsTable = () => {
	const { data, isLoading } = api.event.list.useQuery();

	return (
		<div>{data?.map((event) => <div key={event.id}>{event.title}</div>)}</div>
	);
};
