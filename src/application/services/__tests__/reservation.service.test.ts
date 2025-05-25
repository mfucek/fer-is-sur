import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Reservation } from '../../../domain/entities/reservation.entity';
import { IReservationRepository } from '../../../domain/repositories/ireservation.repository';
import { ReservationService } from '../reservation.service';

const mockReservation: Reservation = {
	id: '1',
	createdAt: new Date(),
	email: 'test@example.com',
	quantity: 2,
	eventId: 'e1',
	totalPrice: 2000,
	reservationStatus: 'CONFIRMED',
	paymentStatus: 'PAID',
	paymentIntentId: null,
	couponId: null
};

describe('ReservationService', () => {
	let reservationRepository: IReservationRepository;
	let service: ReservationService;

	beforeEach(() => {
		reservationRepository = {
			findById: vi.fn().mockResolvedValue(mockReservation),
			findAll: vi.fn().mockResolvedValue([mockReservation]),
			create: vi.fn().mockResolvedValue(mockReservation),
			update: vi.fn().mockResolvedValue(mockReservation),
			delete: vi.fn().mockResolvedValue(undefined),
			findByEventId: vi.fn().mockResolvedValue([mockReservation])
		};
		service = new ReservationService(reservationRepository);
	});

	it('should list reservations', async () => {
		const result = await service.listReservations();
		expect(result).toEqual([mockReservation]);
		expect(reservationRepository.findAll).toHaveBeenCalled();
	});

	it('should get a reservation by id', async () => {
		const result = await service.getReservation('1');
		expect(result).toEqual(mockReservation);
		expect(reservationRepository.findById).toHaveBeenCalledWith('1');
	});

	it('should create a reservation', async () => {
		const { id, createdAt, ...data } = mockReservation;
		// @ts-ignore
		const result = await service.createReservation(data);
		expect(result).toEqual(mockReservation);
		expect(reservationRepository.create).toHaveBeenCalled();
	});

	it('should update a reservation', async () => {
		const result = await service.updateReservation('1', { quantity: 3 });
		expect(result).toEqual(mockReservation);
		expect(reservationRepository.update).toHaveBeenCalledWith('1', {
			quantity: 3
		});
	});

	it('should delete a reservation', async () => {
		await service.deleteReservation('1');
		expect(reservationRepository.delete).toHaveBeenCalledWith('1');
	});

	it('should list reservations by event id', async () => {
		const result = await service.listByEventId('e1');
		expect(result).toEqual([mockReservation]);
		expect(reservationRepository.findByEventId).toHaveBeenCalledWith('e1');
	});
});
