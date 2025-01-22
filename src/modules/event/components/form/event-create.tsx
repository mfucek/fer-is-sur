'use client';

import { useFormContext } from 'react-hook-form';

import { Button } from '@/lib/shadcn/ui/button';
import { Input } from '@/lib/shadcn/ui/input';
import { TEventCreateSchema } from '@/modules/event/schemas';

const FormSection = ({
	children,
	title
}: {
	children: React.ReactNode;
	title: string;
}) => {
	return (
		<div>
			<h2>{title}</h2>
			{children}
		</div>
	);
};

export const DetailsForm = () => {
	const {
		register,
		watch,
		setValue,
		formState: { errors }
	} = useFormContext<TEventCreateSchema>();

	return (
		<FormSection title="Invoice Details">
			<Input {...register('title')} type="text" />
			{errors.title && <p>{errors.title.message}</p>}

			<Input {...register('description')} type="text" />
			{errors.description && <p>{errors.description.message}</p>}

			<Input {...register('location')} type="text" />
			{errors.location && <p>{errors.location.message}</p>}

			<input
				{...register('date', {
					valueAsDate: true
				})}
				type="date"
			/>
			{errors.date && <p>{errors.date.message}</p>}

			<Button>Create</Button>
		</FormSection>
	);
};
