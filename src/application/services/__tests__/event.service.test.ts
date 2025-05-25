import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Event } from '../../../domain/entities/event.entity';
import { IEventRepository } from '../../../domain/repositories/ievent.repository';
import { EventService } from '../event.service';

const mockEvent: Event = {
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

describe('EventService', () => {
	let eventRepository: IEventRepository;
	let service: EventService;

	beforeEach(() => {
		eventRepository = {
			findById: vi.fn().mockResolvedValue(mockEvent),
			findAll: vi.fn().mockResolvedValue([mockEvent]),
			create: vi.fn().mockResolvedValue(mockEvent),
			update: vi.fn().mockResolvedValue(mockEvent),
			delete: vi.fn().mockResolvedValue(undefined),
			findWithReservations: vi.fn().mockResolvedValue(mockEvent)
		};
		service = new EventService(eventRepository);
	});

	it('should list events', async () => {
		const result = await service.listEvents();
		expect(result).toEqual([mockEvent]);
		expect(eventRepository.findAll).toHaveBeenCalled();
	});

	it('should get an event by id', async () => {
		const result = await service.getEvent('1');
		expect(result).toEqual(mockEvent);
		expect(eventRepository.findById).toHaveBeenCalledWith('1');
	});

	it('should create an event', async () => {
		const { id, createdAt, updatedAt, reservations, ...data } = mockEvent;
		// @ts-ignore
		const result = await service.createEvent(data);
		expect(result).toEqual(mockEvent);
		expect(eventRepository.create).toHaveBeenCalled();
	});

	it('should update an event', async () => {
		const result = await service.updateEvent('1', { title: 'Updated' });
		expect(result).toEqual(mockEvent);
		expect(eventRepository.update).toHaveBeenCalledWith('1', {
			title: 'Updated'
		});
	});

	it('should delete an event', async () => {
		await service.deleteEvent('1');
		expect(eventRepository.delete).toHaveBeenCalledWith('1');
	});

	it('should get an event with reservations', async () => {
		const result = await service.getEventWithReservations('1');
		expect(result).toEqual(mockEvent);
		expect(eventRepository.findWithReservations).toHaveBeenCalledWith('1');
	});
});
