'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitErrorHandler, useForm } from 'react-hook-form';

import { ContentPadding } from '@/global/components/content-padding';
import {
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/lib/shadcn/ui/dialog';
import { api } from '@/lib/trpc/react';
import { EventUpdateForm } from '@/modules/event/components/forms/event-update-form';
import { eventUpdateSchema, TEventUpdateSchema } from '@/modules/event/schemas';
import {
	FileStagingContextType,
	FileStagingProvider
} from '@/modules/file/contexts/file-staging';
import { useEffect, useRef, useState } from 'react';
import { EventDTO } from '../../api/dto/event-dto';

export const UpdateEventDialogContent = ({
	event,
	dialogOpen,
	closeDialog
}: {
	event: EventDTO;
	dialogOpen: boolean;
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

	const { data: gallery } = api.event.getGallery.useQuery({
		eventId: event.id
	});

	const utils = api.useUtils();
	const { mutateAsync: updateEvent } = api.event.update.useMutation();
	const { mutateAsync: updateGallery } = api.event.updateGallery.useMutation();

	useEffect(() => {
		if (event) {
			setValue('id', event.id);
			setValue('title', event.title);
			setValue('description', event.description);
			setValue('location', event.location);
			setValue('date', event.date);
		}
	}, []);

	// Add files from EventGallery to file staging context
	useEffect(() => {
		if (!gallery) return;

		fileStagingRef.current?.setFilesFromKeys(
			gallery?.Images.map((image) => image.key) ?? []
		);
	}, [gallery]);

	const [isSaving, setIsSaving] = useState(false);

	const onSubmit = async (data: TEventUpdateSchema) => {
		setIsSaving(true);
		try {
			const { id: eventId } = await updateEvent({ event: data });
			const allFiles = (await fileStagingRef.current?.uploadFiles()) ?? [];
			await updateGallery({
				eventId,
				fileKeys: allFiles.filter((file) => file.key).map((file) => file.key!)
			});
		} catch (error) {
			console.error(error);
		} finally {
			await utils.event.list.invalidate();
			await utils.event.getGallery.invalidate({ eventId: event.id });
			reset();
			closeDialog();
		}
		setIsSaving(false);
	};

	const onInvalid: SubmitErrorHandler<TEventUpdateSchema> = (errors) => {
		console.log(errors);
	};

	const fileStagingRef = useRef<FileStagingContextType>(null);

	return (
		<FileStagingProvider ref={fileStagingRef}>
			<DialogHeader>
				<DialogTitle>Edit Event</DialogTitle>
				<DialogDescription>Edit an existing event.</DialogDescription>
			</DialogHeader>

			<ContentPadding size="xl">
				<FormProvider {...form}>
					<form onSubmit={handleSubmit(onSubmit, onInvalid)}>
						<EventUpdateForm loading={isLoading} />
					</form>
				</FormProvider>
			</ContentPadding>
		</FileStagingProvider>
	);
};
