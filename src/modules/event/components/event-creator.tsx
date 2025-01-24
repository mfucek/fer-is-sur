'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { api } from '@/lib/trpc/react';
import { eventCreateSchema, TEventCreateSchema } from '@/modules/event/schemas';
import { EventCreateForm } from '../forms/event-create-form';

export const EventCreator = () => {
	const form = useForm<TEventCreateSchema>({
		resolver: zodResolver(eventCreateSchema)
	});

	const {
		handleSubmit,
		formState: { errors, isValid, isLoading },
		setValue,
		reset,
		watch
	} = form;

	const utils = api.useUtils();
	const { mutateAsync: createEvent } = api.event.create.useMutation();

	const onSubmit = async (data: TEventCreateSchema) => {
		try {
			await createEvent({ event: data });
		} catch (error) {
			console.error(error);
		} finally {
			await utils.event.list.invalidate();
			reset();
		}
	};

	return (
		<div>
			<FormProvider {...form}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<EventCreateForm />
				</form>
			</FormProvider>
		</div>
	);
};
