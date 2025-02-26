import { DashboardCard } from '../components/dashboard-card';
import { DashboardHeader } from '../components/dashboard-header';

export const DashboardPage = () => {
	return (
		<>
			<div className="container-md pad-sm">
				<DashboardHeader title="Dashboard" />
			</div>

			<div className="container-md pad-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
				<DashboardCard
					label="Events"
					icon="calendar-done"
					href="/admin/events"
				/>
				<DashboardCard
					label="Articles"
					icon="file-textual"
					href="/admin/articles"
				/>
				<DashboardCard
					label="Reservations"
					icon="users"
					href="/admin/reservations"
				/>
				<DashboardCard
					label="Coupons"
					icon="markup-minimum"
					href="/admin/coupons"
				/>
			</div>
		</>
	);
};
