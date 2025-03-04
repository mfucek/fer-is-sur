'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { Input } from '@/deps/shadcn/ui/input';
import { FormLabel } from '@/global/components/form-label';
import { useChangePasswordForm } from './use-change-password-form';

export const ChangePasswordForm = () => {
	const { form, handleFormSubmit, globalError } = useChangePasswordForm();

	return (
		<>
			<form className="pad-xl flex flex-col gap-10" onSubmit={handleFormSubmit}>
				<div className="flex flex-col gap-4">
					<FormLabel
						title="Old Password"
						error={form.formState.errors.oldPassword?.message}
					>
						<Input type="password" {...form.register('oldPassword')} />
					</FormLabel>
					<FormLabel
						title="New Password"
						error={form.formState.errors.newPassword?.message}
					>
						<Input type="password" {...form.register('newPassword')} />
					</FormLabel>
				</div>

				{globalError && (
					<div className="text-danger text-sm text-center">{globalError}</div>
				)}

				<Button loading={form.formState.isSubmitting}>Change Password</Button>
			</form>
		</>
	);
};
