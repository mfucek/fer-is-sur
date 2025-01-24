'use client';

import { ContentPadding } from '@/global/components/content-padding';
import { FormLabel } from '@/global/components/form-label';
import { Button } from '@/lib/shadcn/ui/button';
import { DatePicker } from '@/lib/shadcn/ui/date-picker';
import {
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/lib/shadcn/ui/dialog';
import { Input } from '@/lib/shadcn/ui/input';
import { Textarea } from '@/lib/shadcn/ui/textarea';
import { FilesPreview } from '@/modules/file/components/files-preview';
import { FileStagingProvider } from '@/modules/file/contexts/file-staging';
import { type EventDTO } from '../../api/dto/event-dto';
import { CoverPreview } from '../../components/cover-preview';
import { useUpdateEventForm } from './use-update-event-form';

export const UpdateEventDialogContent = ({ event }: { event: EventDTO }) => {
	const {
		form,
		galleryFileStagingRef,
		coverFileStagingRef,
		isSaving,
		handleFormSubmit
	} = useUpdateEventForm(event);

	const errors = form.formState.errors;
	const { register, watch, setValue } = form;

	return (
		<FileStagingProvider ref={galleryFileStagingRef}>
			<DialogHeader>
				<DialogTitle>Edit Event</DialogTitle>
				<DialogDescription>Edit an existing event.</DialogDescription>
			</DialogHeader>

			<ContentPadding size="xl">
				<form onSubmit={handleFormSubmit}>
					<div className="flex flex-col gap-4">
						<div className="flex flex-row gap-4">
							<FileStagingProvider ref={coverFileStagingRef}>
								<CoverPreview />
							</FileStagingProvider>
							<div className="flex flex-col gap-4 flex-1">
								<FormLabel title="Title" error={errors.title?.message}>
									<Input
										{...register('title')}
										type="text"
										disabled={isSaving}
									/>
								</FormLabel>

								<FormLabel
									title="Description"
									error={errors.description?.message}
								>
									<Textarea {...register('description')} disabled={isSaving} />
								</FormLabel>
							</div>
						</div>

						<div className="flex flex-row gap-2">
							<FormLabel title="Location" error={errors.location?.message}>
								<Input
									{...register('location')}
									type="text"
									disabled={isSaving}
								/>
							</FormLabel>

							<FormLabel title="Date" error={errors.date?.message}>
								<DatePicker
									value={watch('date')}
									onChange={(date) => {
										setValue('date', date);
									}}
									disabled={isSaving}
								/>
							</FormLabel>
						</div>

						<FormLabel title="Image Gallery">
							<FilesPreview />
						</FormLabel>

						<div className="flex flex-row justify-end">
							<Button variant="solid" loading={isSaving}>
								Update
							</Button>
						</div>
					</div>
				</form>
			</ContentPadding>
		</FileStagingProvider>
	);
};
