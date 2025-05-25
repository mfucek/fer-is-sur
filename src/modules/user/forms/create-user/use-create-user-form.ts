import { useDialog } from '@/deps/shadcn/ui/dialog';
import { api } from '@/deps/trpc/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import {
	userCreateSchema,
	type TUserCreateSchema
} from '../../schemas/user-create-schema';

export const useCreateUserForm = () => {
	// React Hook Form
	const form = useForm<TUserCreateSchema>({
		resolver: zodResolver(userCreateSchema),
		defaultValues: {
			email: ''
		}
	});
	const { handleSubmit } = form;

	// Dialog
	const { closeDialog } = useDialog();

	// TRPC
	const utils = api.useUtils();
	const { mutateAsync: createUser, isPending } = api.user.create.useMutation();

	// Form submission
	const onValid: SubmitHandler<TUserCreateSchema> = async (data) => {
		// Prompt for password if not present (for demo, use a static password or extend the form)
		await createUser({ ...data, password: 'changeme' });
		utils.user.list.invalidate();
		closeDialog();
	};

	const onInvalid: SubmitErrorHandler<TUserCreateSchema> = (errors) => {
		console.log(errors);
	};

	const handleFormSubmit = handleSubmit(onValid, onInvalid);

	const isSaving = isPending;

	return { form, handleFormSubmit, isSaving };
};
