import { Icon } from '@/global/components/icon';
import { Button } from '@/lib/shadcn/ui/button';
import { Dialog, DialogTrigger } from '@/lib/shadcn/ui/dialog';
import { EventsList } from '@/modules/event/components/events-list';
import { DashboardHeader } from '../components/dashboard-header';
import { CreateEventDialogContent } from '../dialogs/create-event-dialog';

export const EventDashboardPage = () => {
	return (
		<>
			<DashboardHeader title="Events">
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" size="md">
							Add Event
							<Icon icon="add" />
						</Button>
					</DialogTrigger>

					<CreateEventDialogContent />
				</Dialog>
			</DashboardHeader>

			<EventsList />
		</>
	);
};
