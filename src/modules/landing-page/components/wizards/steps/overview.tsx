import { Button } from '@/deps/shadcn/ui/button';
import { wizardContext } from '@/global/components/wizard';
import { EventDateDTO } from '@/modules/event/api/procedures/get-event-dates';
import { EventCalendar } from '@/modules/event/components/event-calendar';
import { FC, useContext } from 'react';
export const CouponCard = () => {
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

export const OverviewWizardStep: FC<{
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
