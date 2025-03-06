'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { api } from '@/deps/trpc/react';
import { Icon } from '@/global/components/icon';
import { Spinner } from '@/global/components/spinner';
import { Wizard, wizardContext, WizardStep } from '@/global/components/wizard';
import { EventDateDTO } from '@/modules/event/api/procedures/get-event-dates';
import { EventCalendar } from '@/modules/event/components/event-calendar';
import { EventReservationForm } from '@/modules/reservation/forms/event-reserve-form';
import { format } from 'date-fns';
import Image from 'next/image';
import { FC, useContext, useEffect, useState } from 'react';

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
				onClick={() => setCurrentStep(5)}
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

const TimeSlots: FC<{
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
	onEventSelect: (event: EventDateDTO) => void;
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

const EventReservationWizardContent: FC<{
	selectedEvent: EventDateDTO | null;
	setReservationId: (reservationId: string) => void;
}> = ({ selectedEvent, setReservationId }) => {
	const { coverUrl } = useGetEventCover(selectedEvent?.id);
	const { setCurrentStep } = useContext(wizardContext);
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
			<EventReservationForm
				eventId={selectedEvent.id}
				remainingSlots={selectedEvent.remainingSlots}
				onReservationSubmit={(reservationId) => {
					setReservationId(reservationId);
					setCurrentStep(4);
				}}
			/>
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

const EventPaymentStatusContent: FC<{
	selectedEvent: EventDateDTO | null;
	reservationId: string | null;
}> = ({ selectedEvent, reservationId }) => {
	const { data: reservation } = api.reservation.checkStatus.useQuery(
		{ reservationId: reservationId! },
		{ enabled: !!reservationId }
	);

	const utils = api.useUtils();

	useEffect(() => {
		const refetchReservation = async () => {
			if (reservation && reservation.paymentStatus === 'PAID') {
				controller.abort();
				return;
			}
			await utils.reservation.checkStatus.invalidate();
		};

		const controller = new AbortController();
		setTimeout(() => refetchReservation(), 5000, {
			signal: controller.signal
		});

		return () => controller.abort();
	}, []);

	const IconInProgress = () => {
		return (
			<div className="size-18 rounded-full bg-info-weak relative">
				<Spinner className="size-6 border-4 border-info" absolutelyCentered />
			</div>
		);
	};

	const IconSuccess = () => {
		return (
			<div className="p-4 rounded-full bg-success-weak">
				<Icon icon="checkmark" className="size-10 bg-success" />
			</div>
		);
	};

	const IconFailed = () => {
		return (
			<div className="p-4 rounded-full bg-danger-weak">
				<Icon icon="close" className="size-10 bg-danger" />
			</div>
		);
	};

	const ContentInProgress = () => {
		return (
			<>
				<IconInProgress />
				<div className="flex flex-col gap-1">
					<p className="title-3 text-neutral-strong">Plaćanje u tijeku</p>
					<p className="body-1 text-neutral">
						Pratite uputstva na Stripe prozoru.
					</p>
				</div>
			</>
		);
	};

	const ContentSuccess = () => {
		return (
			<>
				<IconSuccess />
				<div className="flex flex-col gap-1 w-full items-center">
					<p className="title-3 text-neutral-strong">Rezervacija uspješna!</p>
					<p className="body-1 text-neutral container-xs">
						Na email su Vam poslani račun i uputstva za eventualno otkazivanje.
					</p>
				</div>
			</>
		);
	};

	return (
		<>
			<WizardBackHeader backStep={1} title="Status" />
			<div className="h-full flex flex-col items-center justify-center text-center gap-10">
				{/* <ContentSuccess /> */}
				<ContentInProgress />
			</div>
		</>
	);
};

export const ReservationWizard = () => {
	const [selectedEvent, setSelectedEvent] = useState<EventDateDTO | null>(null);
	const [reservationId, setReservationId] = useState<string | null>(null);

	return (
		<Wizard className="container-sm pad-md" totalSteps={5} initialStep={4}>
			<WizardStep step={1}>
				<OverviewWizardContent onEventSelect={setSelectedEvent} />
			</WizardStep>

			<WizardStep step={2}>
				<DayEventsWizardContent selectedEvent={selectedEvent} />
			</WizardStep>

			<WizardStep step={3}>
				<EventReservationWizardContent
					selectedEvent={selectedEvent}
					setReservationId={setReservationId}
				/>
			</WizardStep>

			<WizardStep step={4}>
				<EventPaymentStatusContent
					selectedEvent={selectedEvent}
					reservationId={reservationId}
				/>
			</WizardStep>

			<WizardStep step={5}>
				<CouponWizardContent />
			</WizardStep>
		</Wizard>
	);
};
