export interface Event {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	title: string;
	description: string;
	date: Date;
	location: string;
	capacity: number;
	price: number;
	externalReservationUrl?: string | null;
	reservations?: Reservation[];
}

// Forward declaration for Reservation to avoid circular imports
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
}
