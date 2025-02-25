'use client';

import { FormLabel } from '@/global/components/form-label';
import { Icon } from '@/global/components/icon';
import { Wizard, wizardContext, WizardStep } from '@/global/components/wizard';
import { Button } from '@/lib/shadcn/ui/button';
import { Input } from '@/lib/shadcn/ui/input';
import { api } from '@/lib/trpc/react';
import { format } from 'date-fns';
import { FC, useContext } from 'react';
import { EventCalendar } from '../event-calendar';

const ReserveHeader = () => {
	return (
		<div className="flex flex-col gap-2 flex-page">
			<h2 className="container-md display-3 text-neutral text-center">
				Želiš sudjelovati?
			</h2>
			<p className="container-xs body-2 text-neutral-strong text-center">
				Rezerviraj jedan od dostupnih termina!
			</p>
		</div>
	);
};

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

const TimeSlotCard = () => {
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
				<div className="button-lg">12:00</div>
				<div className="body-2 text-theme-strong">7 mjesta preostalo</div>
			</div>
		</Button>
	);
};

const TimeSlots = () => {
	return (
		<div className="flex flex-col gap-2">
			{new Array(3).fill(null).map((_, index) => (
				<TimeSlotCard key={index} />
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
}> = ({ title, location, price, time }) => {
	return (
		<div className="px-6 gap-6 flex flex-row items-center">
			{/* Event cover image */}
			<div className="h-[160px] w-[120px] bg-section rounded-2xl shrink-0" />

			{/* Event details */}
			<div className="px-6 gap-6 flex flex-col">
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
								{format(time, 'dd.MM.yyyy. HH:mm')}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const EventCalendar2 = () => {
	const { data: events } = api.event.list.useQuery();
	const { setCurrentStep } = useContext(wizardContext);

	return <EventCalendar onDaySelect={() => setCurrentStep(2)} />;
};

const EventReservationForm = () => {
	return (
		<div className="flex flex-col gap-2" id="reserve">
			<div className="rounded-2xl bg-section p-6 flex flex-col gap-3">
				<FormLabel title="Email">
					<Input placeholder="Upiši svoj email" />
				</FormLabel>

				<FormLabel
					title="Kupon"
					description="Ako imaš kupon za popust, upiši ga ovdje"
				>
					<Input placeholder="Kupon" />
				</FormLabel>
			</div>

			<Button
				size="card"
				variant="section"
				rightIcon="arrow-right"
				className="w-full"
			>
				<div className="flex flex-col items-start flex-1">
					<div className="button-lg">Nastavi na plaćanje</div>
					<div className="body-2 text-theme-strong">
						Na ovaj mail će biti poslan račun.
					</div>
				</div>
			</Button>
		</div>
	);
};

const OverviewWizardContent = () => {
	return (
		<>
			<EventCalendar2 />
			<CouponCard />
		</>
	);
};

const DayEventsWizardContent = () => {
	return (
		<>
			<WizardBackHeader backStep={1} title="22. 01. 2025." />
			<EventDetails
				title="Potions & Paint - The Shire"
				location="Savska Cesta 144A"
				price={35}
			/>
			<TimeSlots />
		</>
	);
};

const EventReservationWizardContent = () => {
	return (
		<>
			<WizardBackHeader backStep={2} title="Pregled rezervacije" />
			<EventDetails
				title="Potions & Paint - The Shire"
				location="Savska Cesta 144A"
				price={35}
				time={new Date('2025-01-22 12:00')}
			/>
			<EventReservationForm />
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

export const ReserveSection = () => {
	return (
		<div className="flex-page py-20 gap-10">
			<ReserveHeader />

			<Wizard className="container-sm pad-md" totalSteps={2}>
				<WizardStep step={1}>
					<OverviewWizardContent />
				</WizardStep>

				<WizardStep step={2}>
					<DayEventsWizardContent />
				</WizardStep>

				<WizardStep step={3}>
					<EventReservationWizardContent />
				</WizardStep>

				<WizardStep step={4}>
					<CouponWizardContent />
				</WizardStep>
			</Wizard>
		</div>
	);
};
