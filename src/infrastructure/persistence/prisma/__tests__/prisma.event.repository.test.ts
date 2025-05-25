import { PrismaClient } from '@prisma/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PrismaEventRepository } from '../prisma.event.repository';

const mockEvent = {
	id: '1',
	createdAt: new Date(),
	updatedAt: new Date(),
	title: 'Test Event',
	description: 'Description',
	date: new Date(),
	location: 'Test Location',
	capacity: 100,
	price: 1000,
	externalReservationUrl: null,
	reservations: []
};

describe('PrismaEventRepository', () => {
	let prisma: PrismaClient;
	let repo: PrismaEventRepository;

	beforeEach(() => {
		prisma = {
			event: {
				findUnique: vi.fn().mockResolvedValue(mockEvent),
				findMany: vi.fn().mockResolvedValue([mockEvent]),
				create: vi.fn().mockResolvedValue(mockEvent),
				update: vi.fn().mockResolvedValue(mockEvent),
				delete: vi.fn().mockResolvedValue(undefined)
			}
		} as any;
		repo = new PrismaEventRepository(prisma);
	});

	it('should find an event by id', async () => {
		const result = await repo.findById('1');
		expect(result).toEqual(mockEvent);
		expect(prisma.event.findUnique).toHaveBeenCalledWith({
			where: { id: '1' }
		});
	});

	it('should find all events', async () => {
		const result = await repo.findAll();
		expect(result).toEqual([mockEvent]);
		expect(prisma.event.findMany).toHaveBeenCalled();
	});

	it('should create an event', async () => {
		const { id, createdAt, updatedAt, reservations, ...data } = mockEvent;
		// @ts-ignore
		const result = await repo.create(data);
		expect(result).toEqual(mockEvent);
		expect(prisma.event.create).toHaveBeenCalledWith({ data });
	});

	it('should update an event', async () => {
		const result = await repo.update('1', { title: 'Updated' });
		expect(result).toEqual(mockEvent);
		expect(prisma.event.update).toHaveBeenCalledWith({
			where: { id: '1' },
			data: { title: 'Updated' }
		});
	});

	it('should delete an event', async () => {
		await repo.delete('1');
		expect(prisma.event.delete).toHaveBeenCalledWith({ where: { id: '1' } });
	});

	it('should find an event with reservations', async () => {
		const result = await repo.findWithReservations('1');
		expect(result).toEqual(mockEvent);
		expect(prisma.event.findUnique).toHaveBeenCalledWith({
			where: { id: '1' },
			include: { Reservations: true }
		});
	});
});
