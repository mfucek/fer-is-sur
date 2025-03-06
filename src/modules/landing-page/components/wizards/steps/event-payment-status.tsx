import { api } from '@/deps/trpc/react';
import { Icon } from '@/global/components/icon';
import { Spinner } from '@/global/components/spinner';
import { EventDateDTO } from '@/modules/event/api/procedures/get-event-dates';
import { FC, useEffect } from 'react';
import { WizardBackHeader } from '../wizard-back-header';

export const EventPaymentStatusWizardStep: FC<{
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
