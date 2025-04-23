'use client';

import { FC } from 'react';

import { Button } from '@/deps/shadcn/ui/button';
import { Input } from '@/deps/shadcn/ui/input';
import { Textarea } from '@/deps/shadcn/ui/textarea';
import { FormLabel } from '@/global/components/form-label';
import { useCouponPurchaseForm } from './use-coupon-purchase-form';

export const CouponPurchaseForm: FC<{
	onPurchaseSubmit: () => void;
}> = ({ onPurchaseSubmit }) => {
	const { form, handleFormSubmit, globalError } =
		useCouponPurchaseForm(onPurchaseSubmit);

	return (
		<form
			className="flex flex-col gap-2"
			id="reserve"
			onSubmit={handleFormSubmit}
		>
			<div className="rounded-2xl bg-section p-6 flex flex-col gap-3">
				<div className="flex flex-col gap-3">
					<FormLabel
						title="Vaš email *"
						error={form.formState.errors.creatorEmail?.message}
						description="Na ovaj email će biti poslan račun."
					>
						<Input
							placeholder="Upiši svoj email"
							{...form.register('creatorEmail')}
						/>
					</FormLabel>

					<FormLabel
						title="Email primatelja"
						error={form.formState.errors.recipientEmail?.message}
					>
						<Input
							placeholder="Email osobe kojoj želite poslati kupon"
							{...form.register('recipientEmail')}
						/>
					</FormLabel>

					<FormLabel
						title="Poruka primatelju"
						error={form.formState.errors.recepientMessage?.message}
					>
						<Textarea
							placeholder="Poruka koja će biti poslana primatelju kupona"
							{...form.register('recepientMessage')}
						/>
					</FormLabel>
				</div>

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
