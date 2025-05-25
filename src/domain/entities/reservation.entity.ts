import type { Event } from './event.entity';

export interface Reservation {
	id: string;
	createdAt: Date;
	email: string;
	quantity: number;
	eventId: string;
	totalPrice: number;
	reservationStatus: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
	paymentStatus: 'NOT_PAID' | 'PAID' | 'REFUNDED';
	paymentIntentId?: string | null;
	couponId?: string | null;
	event?: Event;
}
