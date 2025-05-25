// This file is disabled. It depended on the legacy reservation router and UI components. Refactor to use the new architecture before re-enabling.

import { Badge } from '@/deps/shadcn/ui/badge';
import { Spinner } from '@/global/components/spinner';
import { api } from '@/presentation/api/trpc/react';
import { FC } from 'react';

interface EventReservationsListProps {
	eventId: string;
}

export const EventReservationsList: FC<EventReservationsListProps> = ({
	eventId
}) => {
	const { data: reservations, isLoading } =
		api.reservation.listByEventId.useQuery(eventId);

	if (isLoading) return <Spinner />;
	if (!reservations || reservations.length === 0)
		return <div>Nema rezervacija za ovaj događaj.</div>;

	return (
		<div className="container-md pad-xl">
			<h2 className="title-2 mb-6">Rezervacije</h2>
			<ul>
				{reservations.map((reservation) => (
					<li key={reservation.id} className="flex items-center gap-4 mb-2">
						<span>{reservation.email}</span>
						<Badge>{reservation.reservationStatus}</Badge>
						<Badge>{reservation.paymentStatus}</Badge>
						<span>Količina: {reservation.quantity}</span>
						<span>Cijena: {reservation.totalPrice / 100} €</span>
					</li>
				))}
			</ul>
		</div>
	);
};
