import { PrismaClient } from '@prisma/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PrismaReservationRepository } from '../prisma.reservation.repository';

const mockReservation = {
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

describe('PrismaReservationRepository', () => {
	let prisma: PrismaClient;
	let repo: PrismaReservationRepository;

	beforeEach(() => {
		prisma = {
			reservation: {
				findUnique: vi.fn().mockResolvedValue(mockReservation),
				findMany: vi.fn().mockResolvedValue([mockReservation]),
				create: vi.fn().mockResolvedValue(mockReservation),
				update: vi.fn().mockResolvedValue(mockReservation),
				delete: vi.fn().mockResolvedValue(undefined)
			}
		} as any;
		repo = new PrismaReservationRepository(prisma);
	});

	it('should find a reservation by id', async () => {
		const result = await repo.findById('1');
		expect(result).toEqual(mockReservation);
		expect(prisma.reservation.findUnique).toHaveBeenCalledWith({
			where: { id: '1' }
		});
	});

	it('should find all reservations', async () => {
		const result = await repo.findAll();
		expect(result).toEqual([mockReservation]);
		expect(prisma.reservation.findMany).toHaveBeenCalled();
	});

	it('should create a reservation', async () => {
		const { id, createdAt, ...data } = mockReservation;
		// @ts-ignore
		const result = await repo.create(data);
		expect(result).toEqual(mockReservation);
		expect(prisma.reservation.create).toHaveBeenCalledWith({ data });
	});

	it('should update a reservation', async () => {
		const result = await repo.update('1', { quantity: 3 });
		expect(result).toEqual(mockReservation);
		expect(prisma.reservation.update).toHaveBeenCalledWith({
			where: { id: '1' },
			data: { quantity: 3 }
		});
	});

	it('should delete a reservation', async () => {
		await repo.delete('1');
		expect(prisma.reservation.delete).toHaveBeenCalledWith({
			where: { id: '1' }
		});
	});

	it('should find reservations by event id', async () => {
		const result = await repo.findByEventId('e1');
		expect(result).toEqual([mockReservation]);
		expect(prisma.reservation.findMany).toHaveBeenCalledWith({
			where: { eventId: 'e1' }
		});
	});
});
