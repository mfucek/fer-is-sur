import { EventCreator } from '@/modules/event/components/event-creator';
import { EventsTable } from '@/modules/event/components/events-table';

export const AdminDashboardPage = () => {
	return (
		<div>
			<EventCreator />
			<EventsTable />
		</div>
	);
};
