import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useDialog } from '@/deps/shadcn/ui/dialog';
import { api } from '@/deps/trpc/react';
import {
	changePasswordSchema,
	ChangePasswordSchema
} from '../../schemas/change-password-schema';

export const useChangePasswordForm = () => {
	const { closeDialog } = useDialog();

	const { mutateAsync: changePassword, error } =
		api.auth.changePassword.useMutation();

	const form = useForm<ChangePasswordSchema>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			oldPassword: '',
			newPassword: ''
		}
	});

	const onSubmit = async (data: ChangePasswordSchema) => {
		try {
			await changePassword(data);
			closeDialog();
		} catch (e) {}
	};

	const handleFormSubmit = form.handleSubmit(onSubmit);

	return { form, handleFormSubmit, globalError: error?.message || null };
};
