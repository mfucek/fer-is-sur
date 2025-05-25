import { CouponService } from '@/application/services/coupon.service';
import { EventService } from '@/application/services/event.service';
import { ReservationService } from '@/application/services/reservation.service';
import { UserService } from '@/application/services/user.service';
import { PrismaCouponRepository } from '@/infrastructure/persistence/prisma/prisma.coupon.repository';
import { PrismaEventRepository } from '@/infrastructure/persistence/prisma/prisma.event.repository';
import { PrismaReservationRepository } from '@/infrastructure/persistence/prisma/prisma.reservation.repository';
import { PrismaUserRepository } from '@/infrastructure/persistence/prisma/prisma.user.repository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const couponRepository = new PrismaCouponRepository(prisma);
const couponService = new CouponService(couponRepository);
const eventRepository = new PrismaEventRepository(prisma);
const eventService = new EventService(eventRepository);
const reservationRepository = new PrismaReservationRepository(prisma);
const reservationService = new ReservationService(reservationRepository);
const userRepository = new PrismaUserRepository(prisma);
const userService = new UserService(userRepository);

export async function createContext({ req }: { req: Request }) {
	// Extract headers if needed for auth/session in the future
	return {
		db: prisma,
		headers: req.headers,
		session: null,
		prisma,
		couponRepository,
		couponService,
		eventRepository,
		eventService,
		reservationRepository,
		reservationService,
		userRepository,
		userService
		// Add other context fields as needed
	};
}

export type TrpcContext = Awaited<ReturnType<typeof createContext>>;
