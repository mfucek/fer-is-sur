import { wizardContext } from '@/global/components/wizard';
import { EventDateDTO } from '@/modules/event/api/procedures/get-event-dates';
import { EventReservationForm } from '@/modules/reservation/forms/event-reserve-form';
import { FC, useContext } from 'react';
import { EventDetails } from '../event-details';
import { WizardBackHeader } from '../wizard-back-header';
import { useGetEventCover } from './day-events';

export const EventReservationWizardStep: FC<{
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
