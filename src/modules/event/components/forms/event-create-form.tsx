'use client';

import { useFormContext } from 'react-hook-form';

import { FormLabel } from '@/global/components/form-label';
import { Button } from '@/lib/shadcn/ui/button';
import { Input } from '@/lib/shadcn/ui/input';
import { Textarea } from '@/lib/shadcn/ui/textarea';
import { TEventCreateSchema } from '@/modules/event/schemas';

export const EventCreateForm = () => {
	const {
		register,
		watch,
		setValue,
		formState: { errors }
	} = useFormContext<TEventCreateSchema>();

	return (
		<div className="flex flex-col gap-4">
			<FormLabel title="Title" error={errors.title?.message}>
				<Input {...register('title')} type="text" />
			</FormLabel>

			<FormLabel title="Description" error={errors.description?.message}>
				<Textarea {...register('description')} />
			</FormLabel>

			<div className="flex flex-row gap-2">
				<FormLabel title="Location" error={errors.location?.message}>
					<Input {...register('location')} type="text" />
				</FormLabel>

				<FormLabel title="Date" error={errors.date?.message}>
					<Input
						{...register('date', {
							valueAsDate: true
						})}
						type="date"
					/>
				</FormLabel>
			</div>

			<div className="flex flex-row justify-end">
				<Button variant="solid">Create</Button>
			</div>
		</div>
	);
};
