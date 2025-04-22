'use client';

import { useRef, type FC } from 'react';

import { Button } from '@/deps/shadcn/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	type DialogContextType
} from '@/deps/shadcn/ui/dialog';
import { api } from '@/deps/trpc/react';
import {
	Actions,
	ActionsLabel,
	Data,
	Item,
	Items,
	Label,
	Labels,
	List
} from '@/global/components/list';
import { Spinner } from '@/global/components/spinner';
import { formatDate, isToday } from 'date-fns';
import { EventListItemDTO } from '../api/procedures/list';
import { UpdateEventForm } from '../forms/update-event/update-event-form';
import { EventReservationsList } from './event-reservations-list';

const EventRowActions: FC<{ data: EventListItemDTO }> = ({ data }) => {
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
					variant="solid-weak"
					singleIcon="edit"
					size="sm"
					onClick={() => {
						dialogRef.current?.openDialog();
					}}
				/>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Event</DialogTitle>
						<DialogDescription>Edit an existing event.</DialogDescription>
					</DialogHeader>

					<UpdateEventForm event={data} />
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

const EventItem: FC<{ event: EventListItemDTO }> = ({ event }) => {
	return (
		<Item key={event.id}>
			<Data strong>{event.title}</Data>

			<Data>
				{formatDate(event.date, 'dd. MM. yyyy.')} {event.location}
			</Data>

			<Data>{event.price.toFixed(2)} EUR</Data>

			<Data>
				<Dialog>
					<DialogTrigger asChild>
						<Button
							variant="ghost"
							size="sm"
							className="body-3 font-bold -ml-3"
						>
							{event.reservations} / {event.capacity}
						</Button>
					</DialogTrigger>

					<DialogContent>
						<DialogHeader>
							<DialogTitle>Reservations</DialogTitle>
							<DialogDescription>
								View all reservations for this event.
							</DialogDescription>
						</DialogHeader>

						<div className="pad-xl">
							<EventReservationsList eventId={event.id} />
						</div>
					</DialogContent>
				</Dialog>
			</Data>
			<Actions>
				<EventRowActions data={event} />
			</Actions>
		</Item>
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
		(event) =>
			event.date.getTime() < new Date().getTime() && !isToday(event.date)
	);
	const upcomingEvents = data.filter(
		(event) =>
			event.date.getTime() >= new Date().getTime() || isToday(event.date)
	);

	return (
		<>
			<List>
				<Labels>
					<Label>Title</Label>
					<Label>Date & Location</Label>
					<Label>Entry Price</Label>
					<Label>Reservations</Label>
					<ActionsLabel />
				</Labels>

				<Items>
					{upcomingEvents.map((event) => (
						<EventItem key={event.id} event={event} />
					))}
				</Items>

				<Items>
					{pastEvents.map((event) => (
						<EventItem key={event.id} event={event} />
					))}
				</Items>
			</List>
		</>
	);
};
