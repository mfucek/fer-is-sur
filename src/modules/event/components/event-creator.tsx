'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { api } from '@/lib/trpc/react';
import { eventCreateSchema, TEventCreateSchema } from '@/modules/event/schemas';
import { DetailsForm } from './form/event-create';

export const EventCreator = () => {
	const form = useForm<TEventCreateSchema>({
		resolver: zodResolver(eventCreateSchema)
	});

	const {
		handleSubmit,
		formState: { errors, isValid, isLoading },
		setValue,
		watch
	} = form;

	const utils = api.useUtils();
	const { mutateAsync: createEvent } = api.event.create.useMutation();

	const onSubmit = async (data: TEventCreateSchema) => {
		await createEvent({ event: data });
		await utils.event.list.invalidate();
	};

	return (
		<div>
			<FormProvider {...form}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DetailsForm />
				</form>
			</FormProvider>
		</div>
	);
};
