import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Coupon } from '../../../../domain/entities/coupon.entity';
import { couponRouter } from '../coupon.router';

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

describe('couponRouter', () => {
	let ctx: any;
	let caller: ReturnType<typeof couponRouter.createCaller>;

	beforeEach(() => {
		ctx = {
			couponService: {
				listCoupons: vi.fn().mockResolvedValue([mockCoupon]),
				getCoupon: vi.fn().mockResolvedValue(mockCoupon),
				createCoupon: vi.fn().mockResolvedValue(mockCoupon),
				updateCoupon: vi.fn().mockResolvedValue(mockCoupon),
				deleteCoupon: vi.fn().mockResolvedValue(undefined)
			}
		};
		caller = couponRouter.createCaller(ctx);
	});

	it('should list coupons', async () => {
		const result = await caller.list();
		expect(result).toEqual([mockCoupon]);
		expect(ctx.couponService.listCoupons).toHaveBeenCalled();
	});

	it('should get a coupon by id', async () => {
		const result = await caller.get('1');
		expect(result).toEqual(mockCoupon);
		expect(ctx.couponService.getCoupon).toHaveBeenCalledWith('1');
	});

	it('should create a coupon', async () => {
		const { id, createdAt, ...data } = mockCoupon;
		// @ts-ignore
		const result = await caller.create(data);
		expect(result).toEqual(mockCoupon);
		expect(ctx.couponService.createCoupon).toHaveBeenCalled();
	});

	it('should update a coupon', async () => {
		const result = await caller.update({ id: '1', data: { code: 'NEWCODE' } });
		expect(result).toEqual(mockCoupon);
		expect(ctx.couponService.updateCoupon).toHaveBeenCalledWith('1', {
			code: 'NEWCODE'
		});
	});

	it('should delete a coupon', async () => {
		const result = await caller.delete('1');
		expect(result).toEqual({ success: true });
		expect(ctx.couponService.deleteCoupon).toHaveBeenCalledWith('1');
	});
});
