'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { buttonVariants } from '@/deps/shadcn/ui/button';
import { cn } from '@/deps/shadcn/utils';
import { Icon } from '@/global/components/icon';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const Calendar = ({
	className,
	classNames,
	showOutsideDays = true,
	...props
}: CalendarProps) => {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			weekStartsOn={1}
			className={cn('p-3', className)}
			classNames={{
				months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
				month: 'space-y-4',
				caption: 'flex justify-center relative items-center',
				caption_label: 'title-3 text-left w-full',
				nav: 'flex gap-2 items-center shrink-0',
				nav_button: cn(
					buttonVariants({
						theme: 'neutral',
						variant: 'outline',
						size: 'sm',
						hasSingleIcon: true
					})
				),
				nav_button_previous: '',
				nav_button_next: '',
				table: 'w-full border-collapse space-y-1',
				head_row: 'flex',
				head_cell: 'text-neutral-strong w-10 caption',
				row: 'flex w-full',
				cell: 'w-10 text-center p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent-weak first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 rounded-full',
				day: cn(
					buttonVariants({
						theme: 'neutral',
						variant: 'ghost',
						size: 'md',
						hasSingleIcon: true
					})
				),
				day_range_end: 'day-range-end',
				day_selected: cn(
					buttonVariants({
						theme: 'accent',
						variant: 'solid',
						size: 'md',
						hasSingleIcon: true
					})
				),
				day_today: cn('!border !border-neutral-medium'),
				day_outside: cn(
					buttonVariants({
						theme: 'neutral',
						variant: 'ghost-weak',
						size: 'md',
						hasSingleIcon: true
					}),
					'opacity-50'
				),
				day_disabled: 'opacity-50',
				day_range_middle: '',
				// 'aria-selected:bg-accent aria-selected:text-accent-foreground',
				day_hidden: 'invisible',
				...classNames
			}}
			components={{
				IconLeft: () => <Icon icon="chevron-left" />,
				IconRight: () => <Icon icon="chevron-right" />
			}}
			{...props}
		/>
	);
};
Calendar.displayName = 'Calendar';

export { Calendar };
