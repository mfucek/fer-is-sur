'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { DatePicker } from '@/deps/shadcn/ui/date-picker';
import { Input } from '@/deps/shadcn/ui/input';
import { Textarea } from '@/deps/shadcn/ui/textarea';
import { FormLabel } from '@/global/components/form-label';
import { FilesPreview } from '@/modules/file/components/files-preview';
import { FileStagingProvider } from '@/modules/file/contexts/file-staging';
import { GetEventDTO } from '../../api/procedures/get';
import { CoverPreview } from '../../components/cover-preview';
import { useUpdateEventForm } from './use-update-event-form';

export const UpdateEventForm = ({ event }: { event: GetEventDTO }) => {
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
		<form onSubmit={handleFormSubmit} className="pad-xl">
			<div className="flex flex-col gap-4">
				<div className="flex flex-row gap-4">
					<FileStagingProvider ref={coverFileStagingRef}>
						<CoverPreview />
					</FileStagingProvider>
					<div className="flex flex-col gap-4 flex-1">
						<FormLabel title="Title" error={errors.title?.message}>
							<Input {...register('title')} type="text" disabled={isSaving} />
						</FormLabel>

						<FormLabel title="Description" error={errors.description?.message}>
							<Textarea {...register('description')} disabled={isSaving} />
						</FormLabel>

						<FormLabel
							title="External Reservation URL"
							error={errors.externalReservationUrl?.message}
						>
							<Input
								{...register('externalReservationUrl')}
								type="text"
								disabled={isSaving}
							/>
						</FormLabel>
					</div>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
					<FormLabel title="Location" error={errors.location?.message}>
						<Input {...register('location')} type="text" disabled={isSaving} />
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

					<FormLabel title="Capacity" error={errors.capacity?.message}>
						<Input
							{...register('capacity', {
								valueAsNumber: true
							})}
							type="number"
							disabled={isSaving}
						/>
					</FormLabel>

					<FormLabel title="Price" error={errors.price?.message}>
						<Input
							{...register('price', {
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
						Update
					</Button>
				</div>
			</div>
		</form>
	);
};
