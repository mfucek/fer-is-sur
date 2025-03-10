import { Badge } from '@/deps/shadcn/ui/badge';
import { Button } from '@/deps/shadcn/ui/button';
import { api } from '@/deps/trpc/react';
import {
	Actions,
	ActionsLabel,
	Data,
	Item,
	Items,
	Label,
	Labels,
	List
} from '@/global/components/list';
import { ReservationByEvent } from '@/modules/reservation/api/procedures/list-by-event';
import { ReservationStatus } from '@prisma/client';
import { FC } from 'react';

const EventReservationActions: FC<{ reservation: ReservationByEvent }> = ({
	reservation
}) => {
	return (
		<>
			<Button variant="solid-weak" size="sm" singleIcon="trash" />
		</>
	);
};

const EventReservationItem: FC<{ reservation: ReservationByEvent }> = ({
	reservation
}) => {
	return (
		<>
			<Item key={reservation.id}>
				<Data className="truncate body-3">{reservation.email}</Data>

				<Data className="max-w-16">
					<Badge variant="secondary" theme="neutral" icon="user">
						{reservation.quantity}
					</Badge>
				</Data>

				<Data>
					{reservation.paymentStatus === 'PAID' && (
						<Badge variant="secondary" theme="success" icon="checkmark">
							{centsToEuros(reservation.totalPrice)} EUR
						</Badge>
					)}
					{reservation.paymentStatus === 'NOT_PAID' && (
						<Badge variant="secondary" theme="warning" icon="status-pending">
							{centsToEuros(reservation.totalPrice)} EUR
						</Badge>
					)}
					{reservation.paymentStatus === 'REFUNDED' && (
						<Badge variant="tertiary" theme="neutral" icon="refund">
							{centsToEuros(reservation.totalPrice)} EUR
						</Badge>
					)}
				</Data>

				<Data>
					<Badge
						variant="primary"
						theme={
							reservation.reservationStatus === ReservationStatus.CONFIRMED
								? 'success'
								: 'danger'
						}
					>
						{reservation.reservationStatus}
					</Badge>
				</Data>

				<Data>
					{reservation.coupon ? (
						<>
							<Badge theme="neutral" variant="tertiary">
								{reservation.coupon.discountPercent &&
									`${reservation.coupon.discountPercent}% - `}
								{reservation.coupon.discountAmount &&
									`${centsToEuros(reservation.coupon.discountAmount)} EUR - `}
								{reservation.coupon.code}
							</Badge>
						</>
					) : (
						'-'
					)}
				</Data>

				<Actions>
					<EventReservationActions reservation={reservation} />
				</Actions>
			</Item>
		</>
	);
};

const centsToEuros = (cents: number) => {
	return (cents / 100).toFixed(2);
};

export const EventReservationsList: FC<{ eventId: string }> = ({ eventId }) => {
	const { data, isLoading } = api.reservation.listByEvent.useQuery({
		eventId
	});

	const confirmedReservations = data?.filter(
		(reservation) =>
			reservation.reservationStatus === ReservationStatus.CONFIRMED
	);

	const otherReservations = data?.filter(
		(reservation) =>
			reservation.reservationStatus !== ReservationStatus.CONFIRMED
	);

	return (
		<List>
			<Labels>
				<Label>Email</Label>
				<Label className="max-w-16">People</Label>
				<Label>Total Price</Label>
				<Label>Status</Label>
				<Label>Discount</Label>
				<ActionsLabel />
			</Labels>

			<Items>
				{confirmedReservations?.map((reservation) => (
					<EventReservationItem
						key={reservation.id}
						reservation={reservation}
					/>
				))}
			</Items>

			<Items>
				{otherReservations?.map((reservation) => (
					<EventReservationItem
						key={reservation.id}
						reservation={reservation}
					/>
				))}
			</Items>
		</List>
	);
};
