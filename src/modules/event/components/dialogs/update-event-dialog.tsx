'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitErrorHandler, useForm } from 'react-hook-form';

import { ContentPadding } from '@/global/components/content-padding';
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/lib/shadcn/ui/dialog';
import { api } from '@/lib/trpc/react';
import { EventUpdateForm } from '@/modules/event/components/forms/event-update-form';
import { eventUpdateSchema, TEventUpdateSchema } from '@/modules/event/schemas';
import { useEffect } from 'react';

export const UpdateEventDialogContent = ({
	id,
	closeDialog
}: {
	id: string;
	closeDialog: () => void;
}) => {
	const form = useForm<TEventUpdateSchema>({
		resolver: zodResolver(eventUpdateSchema)
	});

	const {
		handleSubmit,
		formState: { errors, isValid, isLoading },
		setValue,
		reset,
		watch
	} = form;

	const utils = api.useUtils();
	const { mutateAsync: updateEvent } = api.event.update.useMutation();
	const { data: event } = api.event.get.useQuery({ id });

	useEffect(() => {
		if (event) {
			setValue('id', event.id);
			setValue('title', event.title);
			setValue('description', event.description);
			setValue('location', event.location);
			setValue('date', event.date);
		}
	}, [event]);

	const onSubmit = async (data: TEventUpdateSchema) => {
		try {
			await updateEvent({ event: data });
		} catch (error) {
			console.error(error);
		} finally {
			await utils.event.list.invalidate();
			reset();
			closeDialog();
		}
	};

	const onInvalid: SubmitErrorHandler<TEventUpdateSchema> = (errors) => {
		console.log(errors);
	};

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Edit Event</DialogTitle>
				<DialogDescription>Edit an existing event.</DialogDescription>
			</DialogHeader>

			<ContentPadding size="xl">
				<FormProvider {...form}>
					<form onSubmit={handleSubmit(onSubmit, onInvalid)}>
						<EventUpdateForm />
					</form>
				</FormProvider>
			</ContentPadding>
		</DialogContent>
	);
};
