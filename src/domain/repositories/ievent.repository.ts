import { Event } from '../entities/event.entity';

export interface IEventRepository {
	findById(id: string): Promise<Event | null>;
	findAll(): Promise<Event[]>;
	create(
		data: Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'reservations'>
	): Promise<Event>;
	update(
		id: string,
		data: Partial<
			Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'reservations'>
		>
	): Promise<Event>;
	delete(id: string): Promise<void>;
	findWithReservations?(id: string): Promise<Event | null>;
	findNextUpcomingEvent(): Promise<Event | null>;
}
