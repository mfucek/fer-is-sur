import { ReportsPage } from '@/modules/report/pages/reports-page';
import { DashboardHeader } from '../components/dashboard-header';

export const ReportsDashboardPage = () => {
	return (
		<>
			<div className="container-md pad-sm">
				<DashboardHeader title="Reports"></DashboardHeader>
			</div>

			<div className="container-md pad-sm flex flex-col gap-10">
				<ReportsPage />
			</div>
		</>
	);
};
