'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { Input } from '@/deps/shadcn/ui/input';
import { FormLabel } from '@/global/components/form-label';
import { useLoginForm } from './use-login-form';

export const LoginForm = () => {
	const { form, handleFormSubmit, globalError } = useLoginForm();

	return (
		<>
			<form className="flex flex-col gap-10" onSubmit={handleFormSubmit}>
				<div className="flex flex-col gap-4">
					<FormLabel title="Email" error={form.formState.errors.email?.message}>
						<Input type="email" {...form.register('email')} />
					</FormLabel>
					<FormLabel
						title="Password"
						error={form.formState.errors.password?.message}
					>
						<Input type="password" {...form.register('password')} />
					</FormLabel>
				</div>

				{globalError && (
					<div className="text-danger text-sm text-center">{globalError}</div>
				)}

				<Button loading={form.formState.isSubmitting}>Log in</Button>
			</form>
		</>
	);
};
