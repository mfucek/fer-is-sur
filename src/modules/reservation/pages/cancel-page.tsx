import { Button } from '@/deps/shadcn/ui/button';
import { api } from '@/deps/trpc/server';
import { EventDetails } from '@/modules/landing-page/components/wizards/event-details';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface PageProps {
	params: Promise<{
		reservationId: string;
	}>;
}

export const CancelPage: FC<PageProps> = async ({ params }) => {
	const { reservationId } = await params;

	const { reservation, event } = await api.reservation.getById({
		reservationId
	});

	const handleCancel = async () => {
		'use server';

		await api.reservation.cancel({ reservationId });

		redirect('/');
	};

	return (
		<div className="flex-page">
			<div className="flex-page py-20 gap-10 pad-lg" id="reserve">
				<div className="flex flex-col gap-2 flex-page">
					<h2 className="container-md display-3 text-neutral text-center">
						Otkazivanje rezervacije
					</h2>
					<p className="container-xs body-1 text-neutral-strong text-center">
						Žao nam je što otkazujete rezervaciju, nadamo se da ćemo se ponovno
						vidjeti na jednom od naših događaja!
					</p>
				</div>

				<div className="container-sm pad-md">
					<EventDetails
						title={event.title}
						subTitle={
							reservation.quantity === 1
								? '1 osoba'
								: `${reservation.quantity} osobe`
						}
						location={event.location}
						time={event.date}
						coverUrl={event.coverUrl}
					/>
				</div>

				{reservation.reservationStatus === 'CANCELLED' && (
					<div className="text-info text-center body-2 bg-info-weak rounded-lg p-2 w-full container-sm">
						Ova rezervacija je već otkazana.
					</div>
				)}

				{reservation.paymentStatus === 'PAID' && (
					<form action={handleCancel}>
						<Button variant="solid-weak" theme="danger">
							Otkaži rezervaciju
						</Button>
					</form>
				)}
			</div>
		</div>
	);
};
