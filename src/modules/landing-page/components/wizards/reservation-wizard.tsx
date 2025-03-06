'use client';

import { Wizard, WizardStep } from '@/global/components/wizard';
import { EventDateDTO } from '@/modules/event/api/procedures/get-event-dates';
import { useState } from 'react';
import { CouponWizardStep } from './steps/coupon';
import { DayEventsWizardStep } from './steps/day-events';
import { EventPaymentStatusWizardStep } from './steps/event-payment-status';
import { EventReservationWizardStep } from './steps/event-reservation';
import { OverviewWizardStep } from './steps/overview';

export const ReservationWizard = () => {
	const [selectedEvent, setSelectedEvent] = useState<EventDateDTO | null>(null);
	const [reservationId, setReservationId] = useState<string | null>(null);

	return (
		<Wizard className="container-sm pad-md" totalSteps={5} initialStep={1}>
			<WizardStep step={1}>
				<OverviewWizardStep onEventSelect={setSelectedEvent} />
			</WizardStep>

			<WizardStep step={2}>
				<DayEventsWizardStep selectedEvent={selectedEvent} />
			</WizardStep>

			<WizardStep step={3}>
				<EventReservationWizardStep
					selectedEvent={selectedEvent}
					setReservationId={setReservationId}
				/>
			</WizardStep>

			<WizardStep step={4}>
				<EventPaymentStatusWizardStep
					selectedEvent={selectedEvent}
					reservationId={reservationId}
				/>
			</WizardStep>

			<WizardStep step={5}>
				<CouponWizardStep />
			</WizardStep>
		</Wizard>
	);
};
