import { Button } from '@/deps/shadcn/ui/button';
import { DatePicker } from '@/deps/shadcn/ui/date-picker';
import { Input } from '@/deps/shadcn/ui/input';
import { FormLabel } from '@/global/components/form-label';
import { useCreateCouponForm } from './use-create-coupon-form';

export const CreateCouponForm = () => {
	const { form, handleFormSubmit, isSaving } = useCreateCouponForm();

	return (
		<form className="pad-xl" onSubmit={handleFormSubmit}>
			<div className="flex flex-col gap-2">
				<FormLabel title="Code" error={form.formState.errors.code?.message}>
					<Input
						{...form.register('code')}
						type="text"
						placeholder="Auto-generated"
						disabled={isSaving}
					/>
				</FormLabel>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
					<FormLabel
						title="Discount Percent"
						error={form.formState.errors.discountPercent?.message}
					>
						<Input
							{...form.register('discountPercent', {
								valueAsNumber: true
							})}
							type="number"
							placeholder="0"
							disabled={isSaving}
						/>
					</FormLabel>

					<FormLabel
						title="Discount Amount"
						error={form.formState.errors.discountAmount?.message}
					>
						<Input
							{...form.register('discountAmount', {
								valueAsNumber: true
							})}
							type="number"
							placeholder="0"
							disabled={isSaving}
						/>
					</FormLabel>

					<FormLabel
						title="Max Uses"
						error={form.formState.errors.maxUses?.message}
						description="0 = unlimited"
					>
						<Input
							{...form.register('maxUses', {
								valueAsNumber: true
							})}
							type="number"
							disabled={isSaving}
						/>
					</FormLabel>

					<FormLabel
						title="Expires At"
						error={form.formState.errors.expiresAt?.message}
					>
						<DatePicker
							value={form.watch('expiresAt')}
							onChange={(date) => {
								if (date) {
									form.setValue('expiresAt', date);
								}
							}}
							disabled={isSaving}
						/>
					</FormLabel>
				</div>
			</div>

			<div className="flex flex-row justify-end">
				<Button variant="solid" type="submit" disabled={isSaving}>
					Create
				</Button>
			</div>
		</form>
	);
};
