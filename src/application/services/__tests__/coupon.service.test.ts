import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Coupon } from '../../../domain/entities/coupon.entity';
import { ICouponRepository } from '../../../domain/repositories/icoupon.repository';
import { CouponService } from '../coupon.service';

const mockCoupon: Coupon = {
	id: '1',
	code: 'TEST',
	creatorByEmail: 'test@example.com',
	createdAt: new Date(),
	expiresAt: null,
	discountPercent: 10,
	discountAmount: null,
	maxUses: 1
};

describe('CouponService', () => {
	let couponRepository: ICouponRepository;
	let service: CouponService;

	beforeEach(() => {
		couponRepository = {
			findById: vi.fn().mockResolvedValue(mockCoupon),
			findAll: vi.fn().mockResolvedValue([mockCoupon]),
			create: vi.fn().mockResolvedValue(mockCoupon),
			update: vi.fn().mockResolvedValue(mockCoupon),
			delete: vi.fn().mockResolvedValue(undefined)
		};
		service = new CouponService(couponRepository);
	});

	it('should list coupons', async () => {
		const result = await service.listCoupons();
		expect(result).toEqual([mockCoupon]);
		expect(couponRepository.findAll).toHaveBeenCalled();
	});

	it('should get a coupon by id', async () => {
		const result = await service.getCoupon('1');
		expect(result).toEqual(mockCoupon);
		expect(couponRepository.findById).toHaveBeenCalledWith('1');
	});

	it('should create a coupon', async () => {
		const { id, createdAt, ...data } = mockCoupon;
		// @ts-ignore
		const result = await service.createCoupon(data);
		expect(result).toEqual(mockCoupon);
		expect(couponRepository.create).toHaveBeenCalled();
	});

	it('should update a coupon', async () => {
		const result = await service.updateCoupon('1', { code: 'NEWCODE' });
		expect(result).toEqual(mockCoupon);
		expect(couponRepository.update).toHaveBeenCalledWith('1', {
			code: 'NEWCODE'
		});
	});

	it('should delete a coupon', async () => {
		await service.deleteCoupon('1');
		expect(couponRepository.delete).toHaveBeenCalledWith('1');
	});
});
