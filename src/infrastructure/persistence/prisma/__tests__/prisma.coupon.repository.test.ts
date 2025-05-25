import { PrismaClient } from '@prisma/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PrismaCouponRepository } from '../prisma.coupon.repository';

const mockCoupon = {
	id: '1',
	code: 'TEST',
	creatorByEmail: 'test@example.com',
	createdAt: new Date(),
	expiresAt: null,
	discountPercent: 10,
	discountAmount: null,
	maxUses: 1
};

describe('PrismaCouponRepository', () => {
	let prisma: PrismaClient;
	let repo: PrismaCouponRepository;

	beforeEach(() => {
		prisma = {
			coupon: {
				findUnique: vi.fn().mockResolvedValue(mockCoupon),
				findMany: vi.fn().mockResolvedValue([mockCoupon]),
				create: vi.fn().mockResolvedValue(mockCoupon),
				update: vi.fn().mockResolvedValue(mockCoupon),
				delete: vi.fn().mockResolvedValue(undefined)
			}
		} as any;
		repo = new PrismaCouponRepository(prisma);
	});

	it('should find a coupon by id', async () => {
		const result = await repo.findById('1');
		expect(result).toEqual(mockCoupon);
		expect(prisma.coupon.findUnique).toHaveBeenCalledWith({
			where: { id: '1' }
		});
	});

	it('should find all coupons', async () => {
		const result = await repo.findAll();
		expect(result).toEqual([mockCoupon]);
		expect(prisma.coupon.findMany).toHaveBeenCalled();
	});

	it('should create a coupon', async () => {
		const { id, createdAt, ...data } = mockCoupon;
		// @ts-ignore
		const result = await repo.create(data);
		expect(result).toEqual(mockCoupon);
		expect(prisma.coupon.create).toHaveBeenCalledWith({ data });
	});

	it('should update a coupon', async () => {
		const result = await repo.update('1', { code: 'NEWCODE' });
		expect(result).toEqual(mockCoupon);
		expect(prisma.coupon.update).toHaveBeenCalledWith({
			where: { id: '1' },
			data: { code: 'NEWCODE' }
		});
	});

	it('should delete a coupon', async () => {
		await repo.delete('1');
		expect(prisma.coupon.delete).toHaveBeenCalledWith({ where: { id: '1' } });
	});
});
