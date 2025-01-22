'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { ContentPadding } from '@/global/components/content-padding';
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/lib/shadcn/ui/dialog';
import { api } from '@/lib/trpc/react';
import { EventCreateForm } from '@/modules/event/components/forms/event-create-form';
import { eventCreateSchema, TEventCreateSchema } from '@/modules/event/schemas';

export const CreateEventDialogContent = ({
	closeDialog
}: {
	closeDialog: () => void;
}) => {
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
			closeDialog();
		}
	};

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Create Event</DialogTitle>
				<DialogDescription>Create a new event.</DialogDescription>
			</DialogHeader>

			<ContentPadding size="xl">
				<FormProvider {...form}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<EventCreateForm />
					</form>
				</FormProvider>
			</ContentPadding>
		</DialogContent>
	);
};
