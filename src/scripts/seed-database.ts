import { db } from '@/deps/db';

export const seedDatabase = async () => {
	// Create a new user (empty password means no password)
	await db.user.create({
		data: {
			email: 'admin@example.com',
			password: ''
		}
	});

	// Create a new event
	await db.event.create({
		data: {
			title: 'Okupljanje na FER-u',
			description: 'Opis događaja',
			date: new Date('2025-05-01T10:00:00Z'),
			location: 'Unska 1, 10000 Zagreb',
			capacity: 30,
			price: 15
		}
	});

	// Create a new reservation
	await db.reservation.create({
		data: {
			email: 'admin@example.com',
			quantity: 1,
			eventId: 'e1',
			totalPrice: 15
		}
	});

	// Create a new coupon
	await db.coupon.create({
		data: {
			code: 'FER2025',
			discountPercent: 10,
			maxUses: 100
		}
	});
};
