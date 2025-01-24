'use client';

import { Icon } from '@/global/components/icon';
import { Button } from '@/lib/shadcn/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/lib/shadcn/ui/dialog';
import { EventsList } from '@/modules/event/components/events-list';
import { CreateEventForm } from '../../event/forms/create-event/create-event-form';
import { DashboardHeader } from '../components/dashboard-header';

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

					<DialogContent>
						<DialogHeader>
							<DialogTitle>Create Event</DialogTitle>
							<DialogDescription>Create a new event.</DialogDescription>
						</DialogHeader>

						<CreateEventForm />
					</DialogContent>
				</Dialog>
			</DashboardHeader>

			<EventsList />
		</>
	);
};
