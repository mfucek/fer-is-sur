'use client';

import { useState } from 'react';

import { Icon } from '@/global/components/icon';
import { Button } from '@/lib/shadcn/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/lib/shadcn/ui/dialog';
import { EventsList } from '@/modules/event/components/events-list';
import { CreateEventDialogContent } from '../../event/components/dialogs/create-event-dialog';
import { DashboardHeader } from '../components/dashboard-header';

export const EventDashboardPage = () => {
	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<>
			<DashboardHeader title="Events">
				<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" size="md">
							Add Event
							<Icon icon="add" />
						</Button>
					</DialogTrigger>

					<DialogContent>
						<CreateEventDialogContent
							closeDialog={() => {
								setDialogOpen(false);
							}}
						/>
					</DialogContent>
				</Dialog>
			</DashboardHeader>

			<EventsList />
		</>
	);
};
