import { PrismaClient } from '@prisma/client';
import { Reservation } from '../../../domain/entities/reservation.entity';
import { IReservationRepository } from '../../../domain/repositories/ireservation.repository';

export class PrismaReservationRepository implements IReservationRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findById(id: string): Promise<Reservation | null> {
		return this.prisma.reservation.findUnique({ where: { id } });
	}

	async findAll(): Promise<Reservation[]> {
		return this.prisma.reservation.findMany();
	}

	async create(
		data: Omit<Reservation, 'id' | 'createdAt' | 'event'>
	): Promise<Reservation> {
		return this.prisma.reservation.create({ data });
	}

	async update(
		id: string,
		data: Partial<Omit<Reservation, 'id' | 'createdAt' | 'event'>>
	): Promise<Reservation> {
		return this.prisma.reservation.update({ where: { id }, data });
	}

	async delete(id: string): Promise<void> {
		await this.prisma.reservation.delete({ where: { id } });
	}

	async findByEventId(eventId: string): Promise<Reservation[]> {
		return this.prisma.reservation.findMany({ where: { eventId } });
	}
}
