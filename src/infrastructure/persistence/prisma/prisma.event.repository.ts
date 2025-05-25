import { PrismaClient } from '@prisma/client';
import { Event } from '../../../domain/entities/event.entity';
import { IEventRepository } from '../../../domain/repositories/ievent.repository';

export class PrismaEventRepository implements IEventRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findById(id: string): Promise<Event | null> {
		return this.prisma.event.findUnique({ where: { id } });
	}

	async findAll(): Promise<Event[]> {
		return this.prisma.event.findMany({ include: { Reservations: true } });
	}

	async create(
		data: Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'reservations'>
	): Promise<Event> {
		return this.prisma.event.create({ data });
	}

	async update(
		id: string,
		data: Partial<
			Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'reservations'>
		>
	): Promise<Event> {
		return this.prisma.event.update({ where: { id }, data });
	}

	async delete(id: string): Promise<void> {
		await this.prisma.event.delete({ where: { id } });
	}

	async findWithReservations(id: string): Promise<Event | null> {
		return this.prisma.event.findUnique({
			where: { id },
			include: { Reservations: true }
		}) as unknown as Event | null;
	}

	async findNextUpcomingEvent(): Promise<Event | null> {
		return this.prisma.event.findFirst({
			where: { date: { gt: new Date() } },
			orderBy: { date: 'asc' }
		});
	}
}
