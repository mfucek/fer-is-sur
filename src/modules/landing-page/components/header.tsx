'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { cn } from '@/deps/shadcn/utils';
import { ThemeToggler } from '@/modules/theme/components/theme-toggler';
import { navigateToId } from '@/utils/navigate-to-id';
import { useEffect, useState } from 'react';

export const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const controller = new AbortController();
		const handleScroll = () => {
			const windowHeight = window.innerHeight;
			const scrollY = window.scrollY;
			// setIsScrolled(scrollY > windowHeight / 2);
			setIsScrolled(scrollY > 0);
		};
		window.addEventListener('scroll', handleScroll, {
			signal: controller.signal
		});
		return () => controller.abort();
	}, []);

	return (
		<div
			className={cn(
				'fixed container-xl pad-lg pt-6 pb-8 flex justify-between items-center z-10',
				'transition-all duration-700',
				'dottet-gradient-pre',
				isScrolled && 'dotted-gradient'
			)}
		>
			<h1
				className="title-2 tracking-[1.8px] font-black text-neutral sm:hover:text-accent clickable transition-all"
				onClick={() => navigateToId('hero')}
			>
				CRNI MAG
			</h1>
			<div className="flex flex-row gap-4 items-center">
				<div className="flex-row items-center hidden sm:flex">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => navigateToId('past-events')}
					>
						Prethodne radionice
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => navigateToId('about')}
					>
						O studiju
					</Button>
				</div>

				{/* <div className="w-px bg-neutral-medium self-stretch my-3" /> */}

				<ThemeToggler variant="ghost" size="sm" />

				{/* <div className="w-px bg-neutral-medium self-stretch my-3" /> */}

				<Button
					variant="solid-weak"
					theme="accent"
					size="md"
					onClick={() => navigateToId('reserve')}
				>
					Rezerviraj termin
				</Button>
			</div>
		</div>
	);
};
