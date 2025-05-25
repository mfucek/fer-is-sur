import { api } from '@/presentation/api/trpc/react';
import { useCallback } from 'react';
import { Coupon } from '../../../domain/entities/coupon.entity';
import { CouponsList } from '../../../modules/coupon/components/coupons-list';

// CouponsListContainer is now fully integrated with the new tRPC React client and architecture.

export function CouponsListContainer() {
	const { data: coupons = [], isLoading } = api.coupon.list.useQuery();
	const utils = api.useUtils();
	const { mutateAsync: deleteCoupon, isPending } =
		api.coupon.delete.useMutation({
			onSuccess: () => utils.coupon.list.invalidate()
		});

	const handleDelete = useCallback(
		async (id: string) => {
			await deleteCoupon(id);
		},
		[deleteCoupon]
	);

	return (
		<CouponsList
			coupons={coupons as Coupon[]}
			isLoading={isLoading}
			onDelete={handleDelete}
			isPending={isPending}
		/>
	);
}
