import { type FC } from 'react';

import { cn } from '@/deps/shadcn/utils';
import { ListShowcaseItem } from '@/modules/event/api/procedures/list-showcase';
import { formatDate } from 'date-fns';
import Image from 'next/image';

export const EventSection: FC<{
	event: ListShowcaseItem;
	side?: 'left' | 'right';
}> = ({ event, side = 'left' }) => {
	const Details = () => (
		<div className="flex flex-col gap-4 pad-xl">
			<div className="flex flex-col gap-1">
				<p className="title-3 text-neutral-strong sm:text-neutral-medium">
					{formatDate(event.date, 'PP')}
				</p>
				<h1 className="display-3 font-bold text-neutral">{event.title}</h1>
			</div>
			<p className="body-1 text-neutral-strong">{event.description}</p>
		</div>
	);

	const Cover = () => (
		<div
			className={cn(
				'relative sm:absolute sm:left-1/2 sm:bottom-0 sm:-translate-x-1/2',
				'overflow-hidden',
				'aspect-square sm:aspect-auto',
				'-mb-30 sm:mb-0',
				'w-full sm:w-[200px] sm:h-[320px] box-content',
				'bg-section sm:border-[12px] border-b-0 border-background',
				'-z-10 sm:z-0'
			)}
		>
			{event.cover && (
				<Image
					src={event.cover}
					alt="Event Cover"
					className="object-cover"
					sizes="100vw"
					priority
					fill
				/>
			)}
			<div className="absolute inset-0 bg-gradient-to-b from-transparent to-background block sm:hidden" />
		</div>
	);

	return (
		<div className="container-lg">
			<div
				className={cn(
					'flex relative flex-col-reverse',
					side === 'left' ? 'sm:flex-row' : 'sm:flex-row-reverse'
				)}
			>
				<div className="grow-0 shrink-0 sm:w-1/2 relative sm:h-[480px]">
					{/* Gallery */}
					<div
						className={cn(
							'sm:absolute sm:w-[50vw] flex gap-3 px-6 sm:px-0',
							'overflow-x-scroll sm:overflow-hidden',
							side === 'left'
								? 'sm:flex-row-reverse sm:items-end sm:right-0'
								: 'sm:flex-row sm:items-end sm:left-0'
						)}
					>
						{event.gallery
							.concat(Array(5 - event.gallery.length).fill(null))
							.slice(0, 5)
							.map((url, index) => (
								<div
									key={index}
									className={cn(
										'w-[160px] h-[160px] sm:w-[400px] sm:h-[400px] shrink-0 bg-section relative overflow-hidden rounded-2xl sm:rounded-none',
										url === null && 'hidden sm:block'
									)}
								>
									{url && (
										<Image
											src={url}
											alt="Event Gallery"
											className="object-cover"
											sizes="100vw"
											fill
										/>
									)}
								</div>
							))}

						{/* Gradient */}
						<div
							className={cn(
								'absolute top-0 bottom-0 w-[120px] lg:w-[400px] sm:block hidden',
								'from-transparent to-background',
								side === 'left'
									? 'left-0 bg-gradient-to-l'
									: 'right-0 bg-gradient-to-r'
							)}
						/>
					</div>
				</div>

				{/* Description */}
				<div
					className={cn(
						'overflow-hidden grow-0 shrink-0 sm:w-1/2 flex flex-col justify-center @container',
						event.gallery.length > 0 && 'mb-10 sm:mb-0',
						side === 'left'
							? 'sm:pl-[120px] lg:pl-[160px]'
							: 'sm:pr-[120px] lg:pr-[160px]'
					)}
				>
					<Details />
				</div>

				{/* Cover */}
				<Cover />
			</div>
		</div>
	);
};
