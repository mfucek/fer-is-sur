'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { type SubmitErrorHandler, useForm } from 'react-hook-form';

import { useDialog } from '@/deps/shadcn/ui/dialog';
import { type FileStagingContextType } from '@/modules/file/contexts/file-staging';
import { api } from '@/presentation/api/trpc/react';
import {
	eventCreateSchema,
	type TEventCreateSchema
} from '../../schemas/event-create-schema';

export const useCreateEventForm = () => {
	// React Hook Form
	const form = useForm<TEventCreateSchema>({
		resolver: zodResolver(eventCreateSchema)
	});
	const { handleSubmit } = form;

	// Dialog
	const { closeDialog } = useDialog();

	// TRPC
	const utils = api.useUtils();
	const { mutateAsync: createEvent } = api.event.create.useMutation();
	// const { mutateAsync: updateGallery } = api.event.gallery.update.useMutation(); // TODO: migrate gallery update to new architecture
	// const { mutateAsync: updateCover } = api.event.cover.update.useMutation(); // TODO: migrate cover update to new architecture
	const [isSaving, setIsSaving] = useState(false);

	// File staging refs
	const galleryFileStagingRef = useRef<FileStagingContextType>(null);
	const coverFileStagingRef = useRef<FileStagingContextType>(null);

	// Form submission
	const onSubmit = async (data: TEventCreateSchema) => {
		if (!galleryFileStagingRef.current || !coverFileStagingRef.current) return;

		setIsSaving(true);
		try {
			// Create event in db
			const { id: eventId } = await createEvent(data);

			// Upload gallery files to R2
			const fileKeys = (await galleryFileStagingRef.current.uploadFiles())
				.filter((file) => file.key)
				.map((file) => file.key!);

			// Update gallery in db to reflect R2 files
			// await updateGallery({
			// 	eventId,
			// 	fileKeys: fileKeys
			// });

			const coverFile = coverFileStagingRef.current.files[0];

			if (coverFile) {
				// Upload cover file to R2
				const stagedCoverFile = (
					await coverFileStagingRef.current.uploadFiles()
				)[0];

				if (stagedCoverFile) {
					// Update cover file in db to reflect R2 file
					// await updateCover({
					// 	eventId,
					// 	fileKey: stagedCoverFile.key
					// });
				}
			}
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

	const handleFormSubmit = handleSubmit(onSubmit, onInvalid);

	return {
		handleFormSubmit,
		galleryFileStagingRef,
		coverFileStagingRef,
		isSaving,
		form
	};
};
