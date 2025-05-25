import { Reservation } from '../../domain/entities/reservation.entity';
import { IReservationRepository } from '../../domain/repositories/ireservation.repository';

export class ReservationService {
	constructor(private readonly reservationRepository: IReservationRepository) {}

	async getReservation(id: string): Promise<Reservation | null> {
		return this.reservationRepository.findById(id);
	}

	async listReservations(): Promise<Reservation[]> {
		return this.reservationRepository.findAll();
	}

	async createReservation(
		data: Omit<Reservation, 'id' | 'createdAt' | 'event'>
	): Promise<Reservation> {
		// TODO: Add complex business rule validation here
		return this.reservationRepository.create(data);
	}

	async updateReservation(
		id: string,
		data: Partial<Omit<Reservation, 'id' | 'createdAt' | 'event'>>
	): Promise<Reservation> {
		// TODO: Add complex business rule validation here
		return this.reservationRepository.update(id, data);
	}

	async deleteReservation(id: string): Promise<void> {
		return this.reservationRepository.delete(id);
	}

	async listByEventId(eventId: string): Promise<Reservation[]> {
		return this.reservationRepository.findByEventId(eventId);
	}
}
