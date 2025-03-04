import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { api } from '@/deps/trpc/react';
import { loginSchema, LoginSchema } from '../../schemas/login-schema';

export const useLoginForm = () => {
	const { mutateAsync: login, error } = api.auth.logIn.useMutation();
	const router = useRouter();

	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onSubmit = async (data: LoginSchema) => {
		try {
			await login(data);
			router.push('/admin');
		} catch (e) {}
	};

	const handleFormSubmit = form.handleSubmit(onSubmit);

	return { form, handleFormSubmit, globalError: error?.message || null };
};
