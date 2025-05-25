import { Event } from '../../domain/entities/event.entity';
import { IEventRepository } from '../../domain/repositories/ievent.repository';

export class EventService {
	constructor(private readonly eventRepository: IEventRepository) {}

	async getEvent(id: string): Promise<Event | null> {
		return this.eventRepository.findById(id);
	}

	async listEvents(): Promise<any[]> {
		const events = await this.eventRepository.findAll();
		return events.map((event: any) => ({
			id: event.id,
			createdAt: event.createdAt,
			updatedAt: event.updatedAt,
			date: event.date,
			location: event.location,
			title: event.title,
			description: event.description,
			capacity: event.capacity,
			price: event.price / 100,
			reservations: Array.isArray(event.reservations)
				? event.reservations
						.filter((r: any) => r.reservationStatus === 'CONFIRMED')
						.reduce((acc: number, r: any) => acc + r.quantity, 0)
				: 0,
			externalReservationUrl: event.externalReservationUrl ?? null
		}));
	}

	async createEvent(
		data: Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'reservations'>
	): Promise<Event> {
		// TODO: Add complex business rule validation here
		return this.eventRepository.create(data);
	}

	async updateEvent(
		id: string,
		data: Partial<
			Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'reservations'>
		>
	): Promise<Event> {
		// TODO: Add complex business rule validation here
		return this.eventRepository.update(id, data);
	}

	async deleteEvent(id: string): Promise<void> {
		return this.eventRepository.delete(id);
	}

	async getEventWithReservations(id: string): Promise<Event | null> {
		if (!this.eventRepository.findWithReservations)
			throw new Error('Not implemented');
		return this.eventRepository.findWithReservations(id);
	}

	async getDaysUntilNextEvent(): Promise<number | null> {
		const nextEvent = await this.eventRepository.findNextUpcomingEvent();
		if (!nextEvent) return null;
		const now = new Date();
		const eventDate = new Date(nextEvent.date);
		const diffTime = eventDate.getTime() - now.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	}
}
