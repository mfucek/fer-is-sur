'use client';

import { FC } from 'react';

import { Button } from '@/deps/shadcn/ui/button';
import { Input } from '@/deps/shadcn/ui/input';
import { FormLabel } from '@/global/components/form-label';
import { Icon } from '@/global/components/icon';
import { useEventReserveForm } from './use-event-reserve-form';

export const EventReservationForm: FC<{
	eventId: string;
	remainingSlots: number;
	onReservationSubmit: (reservationId: string) => void;
}> = ({ eventId, remainingSlots, onReservationSubmit }) => {
	const { form, isCouponValid, handleFormSubmit, submitDisabled, globalError } =
		useEventReserveForm(eventId, remainingSlots, onReservationSubmit);

	return (
		<form
			className="flex flex-col gap-2"
			id="reserve"
			onSubmit={handleFormSubmit}
		>
			<div className="rounded-2xl bg-section p-6 flex flex-col gap-3">
				<div className="flex flex-col md:flex-row gap-3">
					<FormLabel
						title="Email"
						error={form.formState.errors.email?.message}
						description="Na ovaj email će biti poslan račun."
					>
						<Input placeholder="Upiši svoj email" {...form.register('email')} />
					</FormLabel>

					<FormLabel
						title="Kupon"
						description="Ako imaš kupon za popust, upiši ga ovdje"
						error={form.formState.errors.couponCode?.message}
					>
						<div className="relative">
							<Input placeholder="Kupon" {...form.register('couponCode')} />

							{isCouponValid === true && (
								<div className="absolute right-2 top-1/2 -translate-y-1/2 bg-success-medium rounded-full p-1">
									<Icon icon="checkmark" className="size-4 bg-success" />
								</div>
							)}

							{isCouponValid === false && (
								<div className="absolute right-2 top-1/2 -translate-y-1/2 bg-danger-medium rounded-full p-1">
									<Icon icon="close" className="size-4 bg-danger" />
								</div>
							)}
						</div>
					</FormLabel>
				</div>

				<FormLabel
					title="Broj osoba"
					error={form.formState.errors.quantity?.message}
				>
					<Input
						placeholder="Broj osoba"
						{...form.register('quantity', {
							valueAsNumber: true
						})}
					/>
				</FormLabel>

				{globalError && (
					<div className="text-danger text-center body-2 bg-danger-weak rounded-lg p-2">
						{globalError}
					</div>
				)}
			</div>

			<Button
				size="card"
				variant="section"
				rightIcon="arrow-right"
				className="w-full"
				disabled={submitDisabled}
			>
				<div className="flex flex-col items-start flex-1">
					<div className="button-lg">Nastavi na plaćanje</div>
					<div className="body-2 text-theme-strong">
						Na ovaj mail će biti poslan račun.
					</div>
				</div>
			</Button>
		</form>
	);
};
