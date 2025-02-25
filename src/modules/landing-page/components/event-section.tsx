import { useEffect, useState, type FC } from 'react';

import { cn } from '@/lib/shadcn/utils';
import { api } from '@/lib/trpc/react';
import { type EventDTO } from '@/modules/event/api/dto/event-dto';
import { formatDate } from 'date-fns';
import Image from 'next/image';

export const EventSection: FC<{ event: EventDTO; side?: 'left' | 'right' }> = ({
	event,
	side = 'left'
}) => {
	const { data: cover } = api.event.getCover.useQuery({ eventId: event.id });
	const { data: gallery } = api.event.getGallery.useQuery({
		eventId: event.id
	});

	const { mutateAsync: makeDownloadUrl } =
		api.file.makeDownloadUrl.useMutation();

	const [coverUrl, setCoverUrl] = useState<string | null>(null);
	const [galleryUrls, setGalleryUrls] = useState<string[]>([]);

	const fetchCover = async () => {
		if (!cover?.Image) return;
		const { url } = await makeDownloadUrl({ key: cover.Image.key });
		setCoverUrl(url);
	};

	const fetchGallery = async () => {
		const urls = await Promise.all(
			gallery?.Images.map(async (file) => {
				const { url } = await makeDownloadUrl({ key: file.key });
				return url;
			}) ?? []
		);
		setGalleryUrls(urls);
	};

	useEffect(() => {
		fetchCover();
	}, [cover]);

	useEffect(() => {
		fetchGallery();
	}, [gallery]);

	const Details = () => (
		<div
			className={cn(
				'overflow-hidden grow-0 shrink-0 w-1/2 flex flex-col gap-4 justify-center',
				side === 'left' ? 'pl-[160px]' : 'pr-[160px]'
			)}
		>
			<div className="flex flex-col gap-1">
				<p className="title-3 text-neutral-medium">
					{formatDate(event.date, 'PP')}
				</p>
				<h1 className="display-3 font-bold text-neutral">{event.title}</h1>
			</div>
			<p className="body-1 text-neutral-strong">{event.description}</p>
		</div>
	);

	const Cover = () => (
		<div className="absolute overflow-hidden left-1/2 bottom-0 -translate-x-1/2 w-[200px] h-[320px] bg-blue-200 border-[12px] border-b-0 box-content border-background">
			{coverUrl && (
				<Image
					src={coverUrl}
					alt="Event Cover"
					className="object-cover"
					sizes="100vw"
					fill
				/>
			)}
		</div>
	);

	return (
		<div className="container-lg py-20">
			<div
				className={cn(
					'flex relative',
					side === 'left' ? 'flex-row' : 'flex-row-reverse'
				)}
			>
				<div className="grow-0 shrink-0 w-1/2 relative h-[480px]">
					{/* Gallery */}
					<div
						className={cn(
							'absolute w-[50vw] flex gap-3',
							side === 'left'
								? 'flex-row-reverse items-end right-0'
								: 'flex-row items-end left-0'
						)}
					>
						{galleryUrls
							.concat(Array(5 - galleryUrls.length).fill(null))
							.slice(0, 5)
							.map((url, index) => (
								<div
									key={index}
									className="w-[400px] h-[400px] shrink-0 bg-neutral-weak relative overflow-hidden"
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
								'absolute top-0 bottom-0 w-[400px]',
								'from-transparent to-background',
								side === 'left'
									? 'left-0 bg-gradient-to-l'
									: 'right-0 bg-gradient-to-r'
							)}
						/>
					</div>
				</div>

				{/* Description */}
				<Details />

				{/* Cover */}
				<Cover />
			</div>
		</div>
	);
};
