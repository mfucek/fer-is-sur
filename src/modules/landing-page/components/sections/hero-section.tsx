'use client';

import { Badge } from '@/deps/shadcn/ui/badge';
import { Button } from '@/deps/shadcn/ui/button';
import { api } from '@/deps/trpc/react';
import { navigateToId } from '@/utils/navigate-to-id';
import Image from 'next/image';
import { Particles } from '../particles/particles';

export const HeroSection = () => {
	const { data: daysUntilNextEvent } =
		api.event.getDaysUntilNextEvent.useQuery();

	return (
		<div
			className="flex-page justify-center relative h-[70vh] md:h-auto"
			id="hero"
		>
			<Image
				src="/assets/images/backdrop.png"
				alt="Backdrop"
				className="object-cover"
				fill
				style={{
					maskImage: 'linear-gradient(to bottom, black, transparent)'
				}}
			/>
			<div className="container-md pad-xl py-20 flex flex-col gap-20 sm:gap-10">
				{/* Logo */}
				<div className="relative">
					<img
						src="/assets/images/hero.png"
						alt="Logo"
						className="w-full drop-shadow-[0_0_0_#000]"
					/>
					<div className="absolute top-1/2 h-1/2 flex flex-row items-center justify-between left-0 w-full px-1 sm:px-2">
						{'LIKOVNE  RADIONICE'.split('').map((letter, index) => (
							<span
								key={index}
								className="title-3 xs:title-1 sm:display-3 text-neutral drop-shadow-[0_0_4px_var(--color-accent)]"
							>
								{letter}
							</span>
						))}
					</div>
				</div>

				{/* Title */}
				<div className="flex flex-col gap-4 items-center">
					{/* CTA */}
					<Particles className="w-fit">
						<Button
							variant="solid"
							theme="neutral"
							size="lg"
							className="w-fit"
							style={{
								boxShadow: '0 0 24px var(--color-accent)'
							}}
							onClick={() => navigateToId('reserve')}
						>
							Rezerviraj termin
						</Button>
					</Particles>

					{/* Days until next event */}
					{daysUntilNextEvent !== null &&
						daysUntilNextEvent !== undefined &&
						daysUntilNextEvent >= 0 && (
							<Badge
								variant="secondary"
								theme="neutral"
								size="lg"
								className="w-fit pointer-events-none"
								icon="status-pending"
							>
								{daysUntilNextEvent > 0 &&
									`Iduća radionica je za ${daysUntilNextEvent} dana`}
								{daysUntilNextEvent === 1 &&
									`Iduća radionica je za ${daysUntilNextEvent} dan`}
								{daysUntilNextEvent === 0 && 'Iduća radionica je danas'}
							</Badge>
						)}
				</div>
			</div>
		</div>
	);
};
