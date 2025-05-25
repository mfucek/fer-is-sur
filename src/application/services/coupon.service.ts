import { Coupon } from '../../domain/entities/coupon.entity';
import { ICouponRepository } from '../../domain/repositories/icoupon.repository';

export class CouponService {
	constructor(private readonly couponRepository: ICouponRepository) {}

	async getCoupon(id: string): Promise<Coupon | null> {
		return this.couponRepository.findById(id);
	}

	async listCoupons(): Promise<Coupon[]> {
		return this.couponRepository.findAll();
	}

	async createCoupon(data: Omit<Coupon, 'id' | 'createdAt'>): Promise<Coupon> {
		// TODO: Add complex business rule validation here
		return this.couponRepository.create(data);
	}

	async updateCoupon(
		id: string,
		data: Partial<Omit<Coupon, 'id' | 'createdAt'>>
	): Promise<Coupon> {
		// TODO: Add complex business rule validation here
		return this.couponRepository.update(id, data);
	}

	async deleteCoupon(id: string): Promise<void> {
		return this.couponRepository.delete(id);
	}
}
