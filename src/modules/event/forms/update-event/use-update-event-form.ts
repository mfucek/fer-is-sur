'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { type SubmitErrorHandler, useForm } from 'react-hook-form';

import { useDialog } from '@/lib/shadcn/ui/dialog';
import { api } from '@/lib/trpc/react';
import {
	eventUpdateSchema,
	type TEventUpdateSchema
} from '@/modules/event/schemas';
import { type FileStagingContextType } from '@/modules/file/contexts/file-staging';
import { type EventDTO } from '../../api/dto/event-dto';

export const useUpdateEventForm = (event: EventDTO) => {
	const form = useForm<TEventUpdateSchema>({
		resolver: zodResolver(eventUpdateSchema)
	});
	const { handleSubmit, setValue, reset } = form;

	const { closeDialog } = useDialog();

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

	const handleFormSubmit = handleSubmit(onSubmit, onInvalid);

	return {
		handleFormSubmit,
		fileStagingRef,
		isSaving,
		form
	};
};
