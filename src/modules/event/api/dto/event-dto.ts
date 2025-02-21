import { Event } from '@prisma/client';

export const makeEventDTO = (event: Event) => ({
	id: event.id,
	createdAt: event.createdAt,
	updatedAt: event.updatedAt,
	date: event.date,
	location: event.location,
	title: event.title,
	description: event.description,
	capacity: event.capacity
});

export type EventDTO = ReturnType<typeof makeEventDTO>;
