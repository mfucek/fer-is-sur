import { Reservation } from '../entities/reservation.entity';

export interface IReservationRepository {
	findById(id: string): Promise<Reservation | null>;
	findAll(): Promise<Reservation[]>;
	create(
		data: Omit<Reservation, 'id' | 'createdAt' | 'event'>
	): Promise<Reservation>;
	update(
		id: string,
		data: Partial<Omit<Reservation, 'id' | 'createdAt' | 'event'>>
	): Promise<Reservation>;
	delete(id: string): Promise<void>;
	findByEventId(eventId: string): Promise<Reservation[]>;
}
