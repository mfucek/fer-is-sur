import { CreateCouponButton } from '@/modules/coupon/components/create-coupon-button';
import { CouponsListContainer } from '@/presentation/app/components/coupons-list-container';
import { DashboardHeader } from '../components/dashboard-header';

export const CouponsDashboardPage = () => {
	return (
		<>
			<div className="container-md pad-sm">
				<DashboardHeader title="Coupons">
					<CreateCouponButton />
				</DashboardHeader>
			</div>

			<div className="container-md pad-sm flex flex-col gap-10">
				<CouponsListContainer />
			</div>
		</>
	);
};
