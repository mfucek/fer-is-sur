'use client';

import { type FC, useRef } from 'react';

import { Button } from '@/deps/shadcn/ui/button';
import {
	Dialog,
	DialogContent,
	type DialogContextType
} from '@/deps/shadcn/ui/dialog';
import { cn } from '@/deps/shadcn/utils';
import { api } from '@/deps/trpc/react';
import { SectionList } from '@/global/components/section-list';
import { Spinner } from '@/global/components/spinner';
import { type EventDTO } from '../api/dto/event-dto';
import { UpdateEventDialogContent } from '../forms/update-event/update-event-form';

const EventRowActions: FC<{ data: EventDTO }> = ({ data }) => {
	const utils = api.useUtils();
	const { mutateAsync: deleteEvent, isPending } =
		api.event.delete.useMutation();

	const handleDelete = async () => {
		try {
			await deleteEvent({ id: data.id });
		} catch (error) {
			console.error(error);
		} finally {
			await utils.event.list.invalidate();
		}
	};

	const dialogRef = useRef<DialogContextType>(null);

	return (
		<>
			<Dialog ref={dialogRef}>
				<Button
					variant="ghost"
					singleIcon="edit"
					size="sm"
					onClick={() => {
						dialogRef.current?.openDialog();
					}}
				/>
				<DialogContent>
					<UpdateEventDialogContent event={data} />
				</DialogContent>
			</Dialog>
			<Button
				variant="solid-weak"
				theme="danger"
				onClick={handleDelete}
				singleIcon="trash"
				size="sm"
				loading={isPending}
			/>
		</>
	);
};

const EventRow: FC<{ item: EventDTO }> = ({ item }) => {
	return (
		<div className="flex flex-col gap-1 w-full overflow-hidden">
			{/* Title */}
			<p className="title-3 overflow-hidden text-neutral">{item.title} </p>

			<div className="flex flex-row gap-2">
				{/* Location */}
				<span className="caption text-neutral-strong">{item.location}</span>

				{/* Date */}
				<span
					className={cn(
						'caption',
						item.date.getTime() > new Date().getTime()
							? 'text-info'
							: 'text-neutral-strong'
					)}
				>
					{item.date ? item.date.toLocaleDateString() : 'No date'}
				</span>
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
			description={data.length + ' events'}
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
