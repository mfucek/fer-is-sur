'use client';
import { Icon } from '@/global/components/icon';
import { format } from 'date-fns';
import Image from 'next/image';
import { FC } from 'react';

export const EventDetails: FC<{
	title: string;
	subTitle?: string;
	location?: string;
	price?: number;
	time?: Date;
	coverUrl?: string | null;
}> = ({ title, location, price, time, coverUrl, subTitle }) => {
	return (
		<div className="px-6 gap-6 flex flex-row items-center">
			{/* Event cover image */}
			<div className="h-[160px] w-[120px] bg-section rounded-2xl shrink-0 overflow-hidden relative">
				{coverUrl && (
					<Image
						src={coverUrl}
						alt="Event cover"
						fill
						className="object-cover"
					/>
				)}
			</div>

			{/* Event details */}
			<div className="gap-6 flex flex-col">
				<div className="flex flex-col gap-1">
					<p className="caption text-neutral-strong">{subTitle ?? 'Tema'}</p>
					<p className="title-1 text-neutral">{title}</p>
				</div>
				<div className="flex flex-col gap-1">
					{location && (
						<div className="flex flex-row gap-2">
							<Icon icon="location" className="size-4 bg-neutral-strong" />
							<p className="body-2 text-neutral-strong">{location}</p>
						</div>
					)}
					{price && (
						<div className="flex flex-row gap-2">
							<Icon icon="user-add" className="size-4 bg-neutral-strong" />
							<p className="body-2 text-neutral-strong">{price} EUR</p>
						</div>
					)}
					{time && (
						<div className="flex flex-row gap-2">
							<Icon
								icon="status-pending"
								className="size-4 bg-neutral-strong"
							/>
							<p className="body-2 text-neutral-strong">
								{format(time, 'dd. MM. yyyy. HH:mm')}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
