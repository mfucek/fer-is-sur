'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import {
	FormProvider,
	type SubmitErrorHandler,
	useForm
} from 'react-hook-form';

import { ContentPadding } from '@/global/components/content-padding';
import {
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/lib/shadcn/ui/dialog';
import { api } from '@/lib/trpc/react';
import { EventCreateForm } from '@/modules/event/components/forms/event-create-form';
import {
	eventCreateSchema,
	type TEventCreateSchema
} from '@/modules/event/schemas';
import {
	type FileStagingContextType,
	FileStagingProvider
} from '@/modules/file/contexts/file-staging';

export const CreateEventDialogContent = ({
	closeDialog
}: {
	closeDialog: () => void;
}) => {
	const form = useForm<TEventCreateSchema>({
		resolver: zodResolver(eventCreateSchema)
	});

	const { handleSubmit } = form;

	const utils = api.useUtils();
	const { mutateAsync: createEvent } = api.event.create.useMutation();
	const { mutateAsync: updateGallery } = api.event.updateGallery.useMutation();

	const [isSaving, setIsSaving] = useState(false);

	const onSubmit = async (data: TEventCreateSchema) => {
		setIsSaving(true);
		try {
			const { id: eventId } = await createEvent({ event: data });
			const allFiles = (await fileStagingRef.current?.uploadFiles()) ?? [];
			await updateGallery({
				eventId,
				fileKeys: allFiles.filter((file) => file.key).map((file) => file.key!)
			});
		} catch (error) {
			console.error(error);
		} finally {
			await utils.event.list.invalidate();
			closeDialog();
		}
		setIsSaving(false);
	};

	const onInvalid: SubmitErrorHandler<TEventCreateSchema> = (errors) => {
		console.log(errors);
	};

	const fileStagingRef = useRef<FileStagingContextType>(null);

	return (
		<>
			<FileStagingProvider ref={fileStagingRef}>
				<DialogHeader>
					<DialogTitle>Create Event</DialogTitle>
					<DialogDescription>Create a new event.</DialogDescription>
				</DialogHeader>

				<ContentPadding size="xl">
					<FormProvider {...form}>
						<form onSubmit={handleSubmit(onSubmit, onInvalid)}>
							<EventCreateForm loading={isSaving} />
						</form>
					</FormProvider>
				</ContentPadding>
			</FileStagingProvider>
		</>
	);
};
