'use client';

import { FileStagingProvider } from '@/modules/file/contexts/file-staging';

import { Button } from '@/deps/shadcn/ui/button';
import { DatePicker } from '@/deps/shadcn/ui/date-picker';
import { Input } from '@/deps/shadcn/ui/input';
import { Textarea } from '@/deps/shadcn/ui/textarea';
import { FormLabel } from '@/global/components/form-label';
import { FilesPreview } from '@/modules/file/components/files-preview';
import { CoverPreview } from '../../components/cover-preview';
import { useCreateEventForm } from './use-create-event-form';

export const CreateEventForm = () => {
	const {
		form,
		galleryFileStagingRef,
		coverFileStagingRef,
		isSaving,
		handleFormSubmit
	} = useCreateEventForm();

	const errors = form.formState.errors;
	const { register, watch, setValue } = form;

	return (
		<div className="pad-xl">
			<form onSubmit={handleFormSubmit}>
				<div className="flex flex-col gap-4">
					<div className="flex flex-row gap-4">
						<FileStagingProvider ref={coverFileStagingRef}>
							<CoverPreview />
						</FileStagingProvider>
						<div className="flex flex-col gap-4 flex-1">
							<FormLabel title="Title" error={errors.title?.message}>
								<Input {...register('title')} type="text" disabled={isSaving} />
							</FormLabel>

							<FormLabel
								title="Description"
								error={errors.description?.message}
							>
								<Textarea {...register('description')} disabled={isSaving} />
							</FormLabel>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
									if (date) {
										setValue('date', date);
									}
								}}
								disabled={isSaving}
							/>
						</FormLabel>

						<FormLabel title="Capacity" error={errors.capacity?.message}>
							<Input
								{...register('capacity', {
									valueAsNumber: true
								})}
								type="number"
								disabled={isSaving}
							/>
						</FormLabel>
					</div>

					<FormLabel title="Image Gallery">
						<FileStagingProvider ref={galleryFileStagingRef}>
							<FilesPreview />
						</FileStagingProvider>
					</FormLabel>

					<div className="flex flex-row justify-end">
						<Button variant="solid" loading={isSaving}>
							Create
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};
