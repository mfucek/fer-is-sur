'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { type SubmitErrorHandler, useForm } from 'react-hook-form';

import { useDialog } from '@/deps/shadcn/ui/dialog';
import { api } from '@/deps/trpc/react';
import { type FileStagingContextType } from '@/modules/file/contexts/file-staging';
import { GetEventDTO } from '../../api/procedures/get';
import {
	eventUpdateSchema,
	type TEventUpdateSchema
} from '../../schemas/event-update-schema';

export const useUpdateEventForm = (event: GetEventDTO) => {
	const form = useForm<TEventUpdateSchema>({
		resolver: zodResolver(eventUpdateSchema)
	});
	const { handleSubmit, setValue, reset } = form;

	const { closeDialog } = useDialog();

	const { data: gallery } = api.event.gallery.get.useQuery({
		eventId: event.id
	});

	const { data: cover } = api.event.cover.get.useQuery({
		eventId: event.id
	});

	const utils = api.useUtils();
	const { mutateAsync: updateEvent } = api.event.update.useMutation();
	const { mutateAsync: updateGallery } = api.event.gallery.update.useMutation();
	const { mutateAsync: updateCover } = api.event.cover.update.useMutation();

	useEffect(() => {
		if (event) {
			setValue('id', event.id);
			setValue('title', event.title);
			setValue('description', event.description);
			setValue('location', event.location);
			setValue('date', event.date);
			setValue('capacity', event.capacity);
			setValue('price', event.price);
		}
	}, []);

	// Add files from EventGallery to gallery file staging context
	useEffect(() => {
		if (!gallery) return;

		galleryFileStagingRef.current?.setFilesFromKeys(
			gallery?.Images.map((image) => image.key) ?? []
		);
	}, [gallery]);

	// Set file from EventCover to cover file staging context
	useEffect(() => {
		console.log('cover', cover);
		if (!cover) return;

		if (cover.Image?.key) {
			coverFileStagingRef.current?.setFilesFromKeys([cover.Image.key]);
		}
	}, [cover]);

	const [isSaving, setIsSaving] = useState(false);

	const onSubmit = async (data: TEventUpdateSchema) => {
		if (!galleryFileStagingRef.current || !coverFileStagingRef.current) return;

		setIsSaving(true);
		try {
			// Update event in db
			const { id: eventId } = await updateEvent({ event: data });

			// Upload new gallery files to R2
			const allFiles =
				(await galleryFileStagingRef.current?.uploadFiles()) ?? [];

			// Update gallery in db to reflect R2 files
			await updateGallery({
				eventId,
				fileKeys: allFiles.filter((file) => file.key).map((file) => file.key!)
			});

			await utils.event.gallery.get.invalidate({ eventId: event.id });

			const coverFile = coverFileStagingRef.current.files[0];

			// Remove cover file from db if no cover file is provided
			if (!coverFile) {
				await updateCover({
					eventId,
					fileKey: null
				});
			}

			if (coverFile) {
				// Upload cover file to R2
				const stagedCoverFile = (
					await coverFileStagingRef.current.uploadFiles()
				)[0];

				if (stagedCoverFile) {
					// Update cover file in db to reflect R2 file

					await updateCover({
						eventId,
						fileKey: stagedCoverFile.key
					});
				}
			}

			await utils.event.cover.get.invalidate({ eventId: event.id });
		} catch (error) {
			console.error(error);
		} finally {
			await utils.event.list.invalidate();
			reset();
			closeDialog();
		}
		setIsSaving(false);
	};

	const onInvalid: SubmitErrorHandler<TEventUpdateSchema> = (errors) => {
		console.log(errors);
	};

	const galleryFileStagingRef = useRef<FileStagingContextType>(null);
	const coverFileStagingRef = useRef<FileStagingContextType>(null);

	const handleFormSubmit = handleSubmit(onSubmit, onInvalid);

	return {
		handleFormSubmit,
		galleryFileStagingRef,
		coverFileStagingRef,
		isSaving,
		form
	};
};
