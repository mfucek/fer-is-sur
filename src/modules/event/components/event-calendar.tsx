import { Button, ButtonProps, buttonVariants } from '@/deps/shadcn/ui/button';
import { cn } from '@/deps/shadcn/utils';
import { api } from '@/deps/trpc/react';
import { Icon } from '@/global/components/icon';
import { useViewport } from '@/utils/use-viewport';
import {
	format,
	getMonth,
	getYear,
	isBefore,
	isSameDay,
	isSameMonth,
	subDays
} from 'date-fns';
import { FC, useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { EventDateDTO } from '../api/procedures/get-event-dates';

const getCurrentMonth = () => {
	const date = new Date();
	const month = getMonth(date);
	const year = getYear(date);
	return new Date(year, month, 1);
};

export const EventCalendar: FC<{
	onEventSelect: (event: EventDateDTO) => void;
}> = ({ onEventSelect }) => {
	const { isMobile } = useViewport();

	const { mutateAsync: getEventDates, data: eventsNearScope } =
		api.event.getEventDates.useMutation();

	const [currentMonthState, setCurrentMonthState] =
		useState<Date>(getCurrentMonth());

	useEffect(() => {
		getEventDates({ monthDate: currentMonthState.getTime() });
	}, [currentMonthState]);

	const buttonSize = isMobile ? 'md' : 'md';
	const dayWidth = isMobile ? 'w-10' : 'w-10';

	return (
		<>
			<DayPicker
				weekStartsOn={1}
				showOutsideDays={true}
				className="text-neutral"
				classNames={{
					// wrapper
					month: 'flex flex-col gap-2 items-center',
					months: 'flex flex-col gap-2 items-center',

					// header
					caption: 'flex flex-row relative items-center w-full mb-10',
					caption_label: 'title-2 text-left w-full',

					nav: 'flex flex-row shrink-0',
					nav_button: buttonVariants({
						theme: 'neutral',
						variant: 'ghost',
						size: buttonSize,
						hasSingleIcon: true
					}),

					//
					table: 'w-full border-collapse',

					// week days
					head_row: 'flex gap-1 mb-2',

					row: 'flex gap-1 mb-1',

					// days
					head_cell: cn('text-neutral-strong caption', dayWidth),
					cell: ''
				}}
				components={{
					IconLeft: () => <Icon icon="chevron-left" />,
					IconRight: () => <Icon icon="chevron-right" />,
					Day: ({ date, displayMonth }) => {
						const isToday = isSameDay(date, new Date());
						const isOutsideCurrentMonth = !isSameMonth(date, displayMonth);
						const isBeforeToday = isBefore(date, subDays(new Date(), 1));

						const hasEvents = eventsNearScope?.some((event) =>
							isSameDay(date, new Date(event.date))
						);

						let variant: ButtonProps['variant'] = 'ghost';
						let theme: ButtonProps['theme'] = 'neutral';
						let disabled: boolean = false;
						let opacity: number = 1;

						if (hasEvents) {
							// is after Today
							variant = 'solid';
							theme = 'neutral';
							disabled = false;
							opacity = 1;

							if (isToday) {
								variant = 'solid';
								theme = 'info';
								disabled = false;
								opacity = 1;
							}

							if (isBeforeToday) {
								variant = 'solid-weak';
								theme = 'neutral';
								disabled = true;
								opacity = 0.5;
							}
						}
						if (!hasEvents) {
							variant = 'ghost';
							theme = 'neutral';
							disabled = true;
							opacity = 0.5;

							if (isToday) {
								variant = 'ghost';
								theme = 'info';
								disabled = true;
								opacity = 1;
							}

							if (isBeforeToday) {
								variant = 'ghost';
								theme = 'neutral';
								disabled = true;
								opacity = 0.5;
							}
						}

						if (isOutsideCurrentMonth && !isToday) {
							opacity = 0.2;
						}

						return (
							<Button
								variant={variant}
								size={buttonSize}
								theme={theme}
								disabled={disabled}
								key={displayMonth.toISOString() + date.toISOString()}
								style={{ opacity }}
								onClick={() => {
									if (hasEvents && !isBeforeToday) {
										const event = eventsNearScope?.find((event) =>
											isSameDay(date, new Date(event.date))
										);

										if (event) {
											onEventSelect(event);
										}
									}
								}}
								hasSingleIcon
							>
								{format(date, 'd')}
								{/* {hasEvents && (
									<div
										className={cn(
											'absolute bottom-0 h-1/3 flex items-center justify-center'
										)}
									>
										<div
											className={cn(
												'size-1 md:size-1.5 rounded-full',
												isBeforeToday ? 'bg-theme-strong' : 'bg-neutral'
											)}
										></div>
									</div>
								)} */}
							</Button>
						);
					}
				}}
				onMonthChange={(date) => {
					setCurrentMonthState(date);
				}}
			/>
		</>
	);
};
