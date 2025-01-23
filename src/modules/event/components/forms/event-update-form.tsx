'use client';

import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormLabel } from '@/global/components/form-label';
import { Button } from '@/lib/shadcn/ui/button';
import { DatePicker } from '@/lib/shadcn/ui/date-picker';
import { Input } from '@/lib/shadcn/ui/input';
import { Textarea } from '@/lib/shadcn/ui/textarea';
import { TEventUpdateSchema } from '@/modules/event/schemas';
import { FilesPreview } from '@/modules/file/components/files-preview';

export const EventUpdateForm: FC<{ loading?: boolean }> = ({ loading }) => {
	const {
		register,
		watch,
		setValue,
		formState: { errors }
	} = useFormContext<TEventUpdateSchema>();

	return (
		<div className="flex flex-col gap-4">
			<FormLabel title="Title" error={errors.title?.message}>
				<Input {...register('title')} type="text" disabled={loading} />
			</FormLabel>

			<FormLabel title="Description" error={errors.description?.message}>
				<Textarea {...register('description')} disabled={loading} />
			</FormLabel>

			<div className="flex flex-row gap-2">
				<FormLabel title="Location" error={errors.location?.message}>
					<Input {...register('location')} type="text" disabled={loading} />
				</FormLabel>

				<FormLabel title="Date" error={errors.date?.message}>
					<DatePicker
						value={watch('date')}
						onChange={(date) => {
							setValue('date', date);
						}}
						disabled={loading}
					/>
				</FormLabel>
			</div>

			<FormLabel title="Image Gallery">
				<FilesPreview />
			</FormLabel>

			<div className="flex flex-row justify-end">
				<Button variant="solid" loading={loading}>
					Update
				</Button>
			</div>
		</div>
	);
};
