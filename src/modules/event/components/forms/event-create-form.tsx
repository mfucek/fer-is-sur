'use client';

import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormLabel } from '@/global/components/form-label';
import { Icon } from '@/global/components/icon';
import { Button } from '@/lib/shadcn/ui/button';
import { Input } from '@/lib/shadcn/ui/input';
import { Textarea } from '@/lib/shadcn/ui/textarea';
import { TEventCreateSchema } from '@/modules/event/schemas';
import { FilesPreview } from '@/modules/file/components/files-preview';

export const EventCreateForm: FC<{ loading?: boolean }> = ({ loading }) => {
	const {
		register,
		watch,
		setValue,
		formState: { errors }
	} = useFormContext<TEventCreateSchema>();

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row gap-4">
				<div className="w-[120px] aspect-[9/16] shrink-0 rounded-lg bg-neutral-weak flex items-center justify-center">
					<Icon icon="add-circle" size={32} className="bg-neutral-strong" />
				</div>
				<div className="flex flex-col gap-4 flex-1">
					<FormLabel title="Title" error={errors.title?.message}>
						<Input {...register('title')} type="text" disabled={loading} />
					</FormLabel>

					<FormLabel title="Description" error={errors.description?.message}>
						<Textarea {...register('description')} disabled={loading} />
					</FormLabel>
				</div>
			</div>

			<div className="flex flex-row gap-2">
				<FormLabel title="Location" error={errors.location?.message}>
					<Input {...register('location')} type="text" disabled={loading} />
				</FormLabel>

				<FormLabel title="Date" error={errors.date?.message}>
					<Input
						{...register('date', {
							valueAsDate: true
						})}
						type="date"
						disabled={loading}
					/>
				</FormLabel>
			</div>

			<FormLabel title="Image Gallery">
				<FilesPreview />
			</FormLabel>

			<div className="flex flex-row justify-end">
				<Button variant="solid" loading={loading}>
					Create
				</Button>
			</div>
		</div>
	);
};
