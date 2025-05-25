import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Event } from '../../../../domain/entities/event.entity';
import { eventRouter } from '../event.router';

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

describe('eventRouter', () => {
	let ctx: any;
	let caller: ReturnType<typeof eventRouter.createCaller>;

	beforeEach(() => {
		ctx = {
			eventService: {
				listEvents: vi.fn().mockResolvedValue([mockEvent]),
				getEvent: vi.fn().mockResolvedValue(mockEvent),
				createEvent: vi.fn().mockResolvedValue(mockEvent),
				updateEvent: vi.fn().mockResolvedValue(mockEvent),
				deleteEvent: vi.fn().mockResolvedValue(undefined),
				getEventWithReservations: vi.fn().mockResolvedValue(mockEvent)
			}
		};
		caller = eventRouter.createCaller(ctx);
	});

	it('should list events', async () => {
		const result = await caller.list();
		expect(result).toEqual([mockEvent]);
		expect(ctx.eventService.listEvents).toHaveBeenCalled();
	});

	it('should get an event by id', async () => {
		const result = await caller.get('1');
		expect(result).toEqual(mockEvent);
		expect(ctx.eventService.getEvent).toHaveBeenCalledWith('1');
	});

	it('should create an event', async () => {
		const { id, createdAt, updatedAt, reservations, ...data } = mockEvent;
		// @ts-ignore
		const result = await caller.create(data);
		expect(result).toEqual(mockEvent);
		expect(ctx.eventService.createEvent).toHaveBeenCalled();
	});

	it('should update an event', async () => {
		const result = await caller.update({ id: '1', data: { title: 'Updated' } });
		expect(result).toEqual(mockEvent);
		expect(ctx.eventService.updateEvent).toHaveBeenCalledWith('1', {
			title: 'Updated'
		});
	});

	it('should delete an event', async () => {
		const result = await caller.delete('1');
		expect(result).toEqual({ success: true });
		expect(ctx.eventService.deleteEvent).toHaveBeenCalledWith('1');
	});

	it('should get an event with reservations', async () => {
		const result = await caller.getWithReservations('1');
		expect(result).toEqual(mockEvent);
		expect(ctx.eventService.getEventWithReservations).toHaveBeenCalledWith('1');
	});
});
