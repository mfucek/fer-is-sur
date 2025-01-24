'use client';

import { type FC, useState } from 'react';

import { Icon } from '@/global/components/icon';
import { SectionList } from '@/global/components/section-list';
import { Spinner } from '@/global/components/spinner';
import { Button } from '@/lib/shadcn/ui/button';
import { Dialog, DialogContent } from '@/lib/shadcn/ui/dialog';
import { cn } from '@/lib/shadcn/utils';
import { api } from '@/lib/trpc/react';
import { type EventDTO } from '../api/dto/event-dto';
import { UpdateEventDialogContent } from './dialogs/update-event-dialog';

const EventRowActions: FC<{ data: EventDTO }> = ({ data }) => {
	const utils = api.useUtils();
	const { mutateAsync: deleteEvent, isPending } =
		api.event.delete.useMutation();

	const [dialogOpen, setDialogOpen] = useState(false);

	const handleDelete = async () => {
		try {
			await deleteEvent({ id: data.id });
		} catch (error) {
			console.error(error);
		} finally {
			await utils.event.list.invalidate();
		}
	};

	return (
		<>
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<Button
					variant="ghost"
					iconOnly
					size="sm"
					onClick={() => {
						setDialogOpen(true);
					}}
				>
					<Icon icon="edit" />
				</Button>
				<DialogContent>
					<UpdateEventDialogContent
						event={data}
						dialogOpen={dialogOpen}
						closeDialog={() => {
							setDialogOpen(false);
						}}
					/>
				</DialogContent>
			</Dialog>
			<Button
				variant="solid-weak"
				theme="danger"
				onClick={handleDelete}
				iconOnly
				size="sm"
				loading={isPending}
			>
				<Icon icon="trash" />
			</Button>
		</>
	);
};

const EventRow: FC<{ item: EventDTO }> = ({ item }) => {
	return (
		<div className="flex flex-col gap-1">
			<div className="flex flex-row gap-2">
				<div>
					<p className="title-3">{item.title}</p>
				</div>
				<div>
					<p className="body-2 text-neutral-strong truncate">
						{item.description}
					</p>
				</div>
			</div>
			<div className="flex flex-row gap-2">
				<div>
					<p className="caption text-neutral-strong">{item.location}</p>
				</div>
				<div>
					<p
						className={cn(
							'caption',
							item.date.getTime() > new Date().getTime()
								? 'text-info'
								: 'text-neutral-strong'
						)}
					>
						{item.date ? item.date.toLocaleDateString() : 'No date'}
					</p>
				</div>
			</div>
		</div>
	);
};

const EventSectionList: FC<{ data: EventDTO[]; title: string }> = ({
	data,
	title
}) => {
	return (
		<SectionList
			data={data}
			rows={(item) => <EventRow item={item} />}
			actions={(item) => <EventRowActions data={item} />}
			title={title}
		/>
	);
};

export const EventsList = () => {
	const { data, isLoading } = api.event.list.useQuery();

	if (!data || isLoading)
		return (
			<div className="flex items-center justify-center">
				<Spinner />
			</div>
		);

	const pastEvents = data.filter(
		(event) => event.date.getTime() < new Date().getTime()
	);
	const upcomingEvents = data.filter(
		(event) => event.date.getTime() > new Date().getTime()
	);

	return (
		<>
			<EventSectionList data={upcomingEvents} title="Upcoming Events" />
			<EventSectionList data={pastEvents} title="Past Events" />
		</>
	);
};
