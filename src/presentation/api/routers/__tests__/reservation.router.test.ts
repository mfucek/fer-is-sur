import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Reservation } from '../../../../domain/entities/reservation.entity';
import { reservationRouter } from '../reservation.router';

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

describe('reservationRouter', () => {
	let ctx: any;
	let caller: ReturnType<typeof reservationRouter.createCaller>;

	beforeEach(() => {
		ctx = {
			reservationService: {
				listReservations: vi.fn().mockResolvedValue([mockReservation]),
				getReservation: vi.fn().mockResolvedValue(mockReservation),
				createReservation: vi.fn().mockResolvedValue(mockReservation),
				updateReservation: vi.fn().mockResolvedValue(mockReservation),
				deleteReservation: vi.fn().mockResolvedValue(undefined),
				listByEventId: vi.fn().mockResolvedValue([mockReservation])
			}
		};
		caller = reservationRouter.createCaller(ctx);
	});

	it('should list reservations', async () => {
		const result = await caller.list();
		expect(result).toEqual([mockReservation]);
		expect(ctx.reservationService.listReservations).toHaveBeenCalled();
	});

	it('should get a reservation by id', async () => {
		const result = await caller.get('1');
		expect(result).toEqual(mockReservation);
		expect(ctx.reservationService.getReservation).toHaveBeenCalledWith('1');
	});

	it('should create a reservation', async () => {
		const { id, createdAt, ...data } = mockReservation;
		// @ts-ignore
		const result = await caller.create(data);
		expect(result).toEqual(mockReservation);
		expect(ctx.reservationService.createReservation).toHaveBeenCalled();
	});

	it('should update a reservation', async () => {
		const result = await caller.update({ id: '1', data: { quantity: 3 } });
		expect(result).toEqual(mockReservation);
		expect(ctx.reservationService.updateReservation).toHaveBeenCalledWith('1', {
			quantity: 3
		});
	});

	it('should delete a reservation', async () => {
		const result = await caller.delete('1');
		expect(result).toEqual({ success: true });
		expect(ctx.reservationService.deleteReservation).toHaveBeenCalledWith('1');
	});

	it('should list reservations by event id', async () => {
		const result = await caller.listByEventId('e1');
		expect(result).toEqual([mockReservation]);
		expect(ctx.reservationService.listByEventId).toHaveBeenCalledWith('e1');
	});
});
