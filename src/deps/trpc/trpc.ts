import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { CouponService } from '@/application/services/coupon.service';
import { EventService } from '@/application/services/event.service';
import { ReservationService } from '@/application/services/reservation.service';
import { UserService } from '@/application/services/user.service';
import { db } from '@/deps/db';
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

export const createTRPCContext = async (opts: { headers: Headers }) => {
	return {
		db,
		session: null,
		...opts,
		prisma,
		couponRepository,
		couponService,
		eventRepository,
		eventService,
		reservationRepository,
		reservationService,
		userRepository,
		userService
	};
};

export const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
			}
		};
	}
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const createTRPCMiddleware = t.middleware;
