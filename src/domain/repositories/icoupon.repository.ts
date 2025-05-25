import { Coupon } from '../entities/coupon.entity';

export interface ICouponRepository {
	findById(id: string): Promise<Coupon | null>;
	findAll(): Promise<Coupon[]>;
	create(data: Omit<Coupon, 'id' | 'createdAt'>): Promise<Coupon>;
	update(
		id: string,
		data: Partial<Omit<Coupon, 'id' | 'createdAt'>>
	): Promise<Coupon>;
	delete(id: string): Promise<void>;
}
