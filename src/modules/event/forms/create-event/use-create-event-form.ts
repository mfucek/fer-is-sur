'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { type SubmitErrorHandler, useForm } from 'react-hook-form';

import { useDialog } from '@/lib/shadcn/ui/dialog';
import { api } from '@/lib/trpc/react';
import {
	eventCreateSchema,
	type TEventCreateSchema
} from '@/modules/event/schemas';
import { type FileStagingContextType } from '@/modules/file/contexts/file-staging';

export const useCreateEventForm = () => {
	const form = useForm<TEventCreateSchema>({
		resolver: zodResolver(eventCreateSchema)
	});

	const { handleSubmit } = form;

	const { closeDialog } = useDialog();

	const utils = api.useUtils();
	const { mutateAsync: createEvent } = api.event.create.useMutation();
	const { mutateAsync: updateGallery } = api.event.updateGallery.useMutation();

	const [isSaving, setIsSaving] = useState(false);

	const onSubmit = async (data: TEventCreateSchema) => {
		if (!fileStagingRef.current) return;

		setIsSaving(true);
		try {
			// Create event in db
			const { id: eventId } = await createEvent({ event: data });

			// Upload gallery files to R2
			const fileKeys = (await fileStagingRef.current.uploadFiles())
				.filter((file) => file.key)
				.map((file) => file.key!);

			// Update gallery in db to reflect R2 files
			await updateGallery({
				eventId,
				fileKeys: fileKeys
			});

			// Upload cover file to R2

			// Update cover file in db to reflect R2 file
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

	const handleFormSubmit = handleSubmit(onSubmit, onInvalid);
	return {
		handleFormSubmit,
		fileStagingRef,
		isSaving,
		form
	};
};
