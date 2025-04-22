import { Button } from '@/deps/shadcn/ui/button';
import { Input } from '@/deps/shadcn/ui/input';
import { FormLabel } from '@/global/components/form-label';
import { useCreateUserForm } from './use-create-user-form';

export const CreateUserForm = () => {
	const { form, handleFormSubmit, isSaving } = useCreateUserForm();

	return (
		<form className="pad-xl" onSubmit={handleFormSubmit}>
			<div className="flex flex-col gap-2">
				<FormLabel title="Email" error={form.formState.errors.email?.message}>
					<Input
						{...form.register('email')}
						type="text"
						placeholder="Email"
						disabled={isSaving}
					/>
				</FormLabel>
			</div>

			<div className="flex flex-row justify-end">
				<Button variant="solid" type="submit" disabled={isSaving}>
					Create
				</Button>
			</div>
		</form>
	);
};
