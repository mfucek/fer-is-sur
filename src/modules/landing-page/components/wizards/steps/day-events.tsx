import { Button } from '@/deps/shadcn/ui/button';
import { api } from '@/deps/trpc/react';
import { wizardContext } from '@/global/components/wizard';
import { EventDateDTO } from '@/modules/event/api/procedures/get-event-dates';
import { format } from 'date-fns';
import { FC, useContext } from 'react';
import { EventDetails } from '../event-details';
import { WizardBackHeader } from '../wizard-back-header';

export const DayEventsWizardStep: FC<{
	selectedEvent: EventDateDTO | null;
}> = ({ selectedEvent }) => {
	const { coverUrl } = useGetEventCover(selectedEvent?.id);

	if (!selectedEvent) return null;

	const { title, location, date, description, price } = selectedEvent;

	return (
		<>
			<WizardBackHeader backStep={1} title={format(date, 'dd. MM. yyyy.')} />
			<EventDetails
				title={title}
				location={location}
				price={price}
				coverUrl={coverUrl}
			/>
			<TimeSlots events={[selectedEvent]} />
		</>
	);
};
export const useGetEventCover = (eventId?: string | null) => {
	const { data: cover } = api.event.cover.get.useQuery(
		{ eventId: eventId! },
		{ enabled: !!eventId }
	);

	return { coverUrl: cover?.url || null };
};
export const TimeSlots: FC<{
	events: EventDateDTO[];
}> = ({ events }) => {
	return (
		<div className="flex flex-col gap-2">
			{events.map((event, index) => (
				<TimeSlotCard
					key={index}
					event={{
						id: event.id,
						date: event.date,
						slots: event.remainingSlots
					}}
				/>
			))}
		</div>
	);
};

export const TimeSlotCard: FC<{
	event: {
		id: string;
		date: Date;
		slots: number;
	};
}> = ({ event }) => {
	const { setCurrentStep } = useContext(wizardContext);

	return (
		<Button
			size="card"
			variant="section"
			rightIcon="arrow-right"
			className="w-full"
			onClick={() => setCurrentStep(3)}
		>
			<div className="flex flex-col items-start flex-1">
				<div className="button-lg">{format(event.date, 'HH:mm')}</div>
				<div className="body-2 text-theme-strong">
					{event.slots} mjesta preostalo
				</div>
			</div>
		</Button>
	);
};
