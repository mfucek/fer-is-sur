export interface Coupon {
	id: string;
	code: string;
	creatorByEmail?: string | null;
	createdAt: Date;
	expiresAt?: Date | null;
	discountPercent?: number | null;
	discountAmount?: number | null;
	maxUses: number;
	uses?: number;
}
