import { AddEventButton } from '@/modules/event/components/add-event-button';
import { EventsList } from '@/modules/event/components/events-list';
import { DashboardHeader } from '../components/dashboard-header';

export const EventsDashboardPage = () => {
	return (
		<>
			<div className="container-md pad-sm">
				<DashboardHeader title="Events">
					<AddEventButton />
				</DashboardHeader>
			</div>

			<div className="container-md pad-sm flex flex-col gap-10">
				<EventsList />
			</div>
		</>
	);
};
