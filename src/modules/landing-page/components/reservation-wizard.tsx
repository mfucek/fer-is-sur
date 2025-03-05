'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { api } from '@/deps/trpc/react';
import { Icon } from '@/global/components/icon';
import { Wizard, wizardContext, WizardStep } from '@/global/components/wizard';
import { EventDTO } from '@/modules/event/api/dto/event-dto';
import { EventCalendar } from '@/modules/event/components/event-calendar';
import { EventReservationForm } from '@/modules/reservation/forms/event-reserve-form';
import { format } from 'date-fns';
import Image from 'next/image';
import { FC, useContext, useState } from 'react';

const CouponCard = () => {
	const { setCurrentStep } = useContext(wizardContext);

	return (
		<div className="p-6 bg-section rounded-2xl flex flex-row items-center gap-3">
			<div className="flex flex-col gap-1">
				<div className="button-lg text-neutral">Poklonski kuponi</div>
				<div className="body-2 text-neutral-strong">
					Usreći nekog tko ti je drag sa kuponom u iznosu pohađanja jedne
					radionice!
				</div>
			</div>
			<Button
				variant={'solid-weak'}
				size="md"
				onClick={() => setCurrentStep(4)}
			>
				Kupi kupon
			</Button>
		</div>
	);
};

const TimeSlotCard: FC<{
	event: {
		id: string;
		date: Date;
		capacity: number;
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
					{event.capacity} mjesta preostalo
				</div>
			</div>
		</Button>
	);
};

const TimeSlots: FC<{
	events: {
		id: string;
		date: Date;
		capacity: number;
	}[];
}> = ({ events }) => {
	return (
		<div className="flex flex-col gap-2">
			{events.map((event, index) => (
				<TimeSlotCard key={index} event={event} />
			))}
		</div>
	);
};

const WizardBackHeader: FC<{
	title: string;
	backStep: number;
}> = ({ title, backStep }) => {
	const { setCurrentStep } = useContext(wizardContext);

	return (
		<div className="flex flex-row items-center gap-2">
			<Button
				variant={'ghost'}
				size="lg"
				singleIcon="arrow-left"
				onClick={() => setCurrentStep(backStep)}
			/>
			<p className="title-3 text-neutral-strong">{title}</p>
		</div>
	);
};

const EventDetails: FC<{
	title: string;
	location?: string;
	price?: number;
	time?: Date;
	coverUrl?: string | null;
}> = ({ title, location, price, time, coverUrl }) => {
	return (
		<div className="px-6 gap-6 flex flex-row items-center">
			{/* Event cover image */}
			<div className="h-[160px] w-[120px] bg-section rounded-2xl shrink-0 overflow-hidden relative">
				{coverUrl && (
					<Image
						src={coverUrl}
						alt="Event cover"
						fill
						className="object-cover"
					/>
				)}
			</div>

			{/* Event details */}
			<div className="gap-6 flex flex-col">
				<div className="flex flex-col gap-1">
					<p className="caption text-neutral-strong">Tema</p>
					<p className="title-1 text-neutral">{title}</p>
				</div>
				<div className="flex flex-col gap-1">
					{location && (
						<div className="flex flex-row gap-2">
							<Icon icon="location" className="size-4 bg-neutral-strong" />
							<p className="body-2 text-neutral-strong">{location}</p>
						</div>
					)}
					{price && (
						<div className="flex flex-row gap-2">
							<Icon icon="user-add" className="size-4 bg-neutral-strong" />
							<p className="body-2 text-neutral-strong">{price} EUR</p>
						</div>
					)}
					{time && (
						<div className="flex flex-row gap-2">
							<Icon
								icon="status-pending"
								className="size-4 bg-neutral-strong"
							/>
							<p className="body-2 text-neutral-strong">
								{format(time, 'dd. MM. yyyy. HH:mm')}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const OverviewWizardContent: FC<{
	onEventSelect: (event: EventDTO) => void;
}> = ({ onEventSelect }) => {
	const { setCurrentStep } = useContext(wizardContext);

	return (
		<>
			<EventCalendar
				onEventSelect={(event) => {
					onEventSelect(event);
					setCurrentStep(2);
				}}
			/>
			<CouponCard />
		</>
	);
};

const useGetEventCover = (eventId?: string | null) => {
	const { data: cover } = api.event.getCover.useQuery(
		{ eventId: eventId! },
		{ enabled: !!eventId }
	);

	return { coverUrl: cover?.url || null };
};

const DayEventsWizardContent: FC<{
	selectedEvent: EventDTO | null;
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

const EventReservationWizardContent: FC<{
	selectedEvent: EventDTO | null;
}> = ({ selectedEvent }) => {
	const { coverUrl } = useGetEventCover(selectedEvent?.id);

	if (!selectedEvent) return null;

	const { title, location, date, description, price } = selectedEvent;

	return (
		<>
			<WizardBackHeader backStep={2} title="Pregled rezervacije" />
			<EventDetails
				title={title}
				location={location}
				price={price}
				time={date}
				coverUrl={coverUrl}
			/>
			<EventReservationForm eventId={selectedEvent.id} />
		</>
	);
};

const CouponWizardContent = () => {
	return (
		<>
			<WizardBackHeader backStep={1} title="Kupon" />
			Kupovanje kupona
		</>
	);
};

export const ReservationWizard = () => {
	const [selectedEvent, setSelectedEvent] = useState<EventDTO | null>(null);
	return (
		<Wizard className="container-sm pad-md" totalSteps={2}>
			<WizardStep step={1}>
				<OverviewWizardContent onEventSelect={setSelectedEvent} />
			</WizardStep>

			<WizardStep step={2}>
				<DayEventsWizardContent selectedEvent={selectedEvent} />
			</WizardStep>

			<WizardStep step={3}>
				<EventReservationWizardContent selectedEvent={selectedEvent} />
			</WizardStep>

			<WizardStep step={4}>
				<CouponWizardContent />
			</WizardStep>
		</Wizard>
	);
};
