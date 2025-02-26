'use client';

import { Badge } from '@/deps/shadcn/ui/badge';
import { Button } from '@/deps/shadcn/ui/button';
import { navigateToId } from '@/utils/navigate-to-id';
import Image from 'next/image';

export const HeroSection = () => {
	return (
		<div
			className="flex-page justify-center relative h-[80vh] md:h-auto"
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
			<div className="container-md pad-lg py-20 flex flex-col gap-20 sm:gap-10">
				{/* Logo */}
				<div className="relative">
					<img src="/assets/images/hero.png" alt="Logo" className="w-full" />
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
					<Button
						variant="solid"
						theme="accent"
						size="lg"
						className="w-fit"
						onClick={() => navigateToId('reserve')}
					>
						Rezerviraj termin
					</Button>
					<Badge
						variant="secondary"
						theme="neutral"
						size="lg"
						className="w-fit"
						icon="status-pending"
					>
						Iduća radionica je za 8 dana
					</Badge>
				</div>
			</div>
		</div>
	);
};
