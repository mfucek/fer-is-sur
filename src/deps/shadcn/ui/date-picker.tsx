'use client';

import { format } from 'date-fns';
import { useState, type FC } from 'react';

import { Calendar } from '@/deps/shadcn/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/deps/shadcn/ui/popover';
import { cn } from '@/deps/shadcn/utils';
import { Icon } from '@/global/components/icon';
import { Button } from './button';

export const DatePicker: FC<{
	value?: Date;
	defaultValue?: Date;
	onChange?: (date: Date | undefined) => void;
	disabled?: boolean;
}> = ({ value, defaultValue, onChange, disabled }) => {
	const [internalDate, setInternalDate] = useState<Date | undefined>(
		defaultValue
	);

	const isEmpty = !value && !internalDate;

	const handleChange = (date: Date | undefined) => {
		setInternalDate(date);
		onChange?.(date);
	};

	const shownDate = value ?? internalDate;

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					theme="neutral"
					// className={cn(
					// 	'relative inline-flex items-center justify-start whitespace-nowrap ring-offset-background duration-300 hover:md:duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:opacity-50 group-[btn]',
					// 	'border border-neutral-medium text-neutral hover:md:bg-neutral-weak',
					// 	'h-[40px] px-[16px] gap-[6px] button-md',
					// 	'rounded-lg',
					// 	isEmpty && 'text-neutral-medium'
					// )}
					className="justify-start px-3"
					disabled={disabled}
				>
					<Icon
						icon="calendar-done"
						className={cn('bg-neutral-strong size-4')}
					/>
					{shownDate ? (
						<span className="input">{format(shownDate, 'PPP')}</span>
					) : (
						<span className="input">Pick a date</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={value ?? internalDate}
					onSelect={handleChange}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
};
