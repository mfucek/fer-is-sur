import { PrismaClient } from '@prisma/client';
import { Coupon } from '../../../domain/entities/coupon.entity';
import { ICouponRepository } from '../../../domain/repositories/icoupon.repository';

export class PrismaCouponRepository implements ICouponRepository {
	private prisma: PrismaClient;

	constructor(prismaClient: PrismaClient) {
		this.prisma = prismaClient;
	}

	async findById(id: string): Promise<Coupon | null> {
		return this.prisma.coupon.findUnique({ where: { id } });
	}

	async findAll(): Promise<Coupon[]> {
		return this.prisma.coupon.findMany();
	}

	async create(data: Omit<Coupon, 'id' | 'createdAt'>): Promise<Coupon> {
		return this.prisma.coupon.create({ data });
	}

	async update(
		id: string,
		data: Partial<Omit<Coupon, 'id' | 'createdAt'>>
	): Promise<Coupon> {
		return this.prisma.coupon.update({ where: { id }, data });
	}

	async delete(id: string): Promise<void> {
		await this.prisma.coupon.delete({ where: { id } });
	}
}
