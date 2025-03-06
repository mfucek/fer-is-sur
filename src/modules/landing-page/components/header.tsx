'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@/deps/shadcn/ui/button';
import { cn } from '@/deps/shadcn/utils';
import { Protected } from '@/modules/auth/components/protected';
import { ThemeToggler } from '@/modules/theme/components/theme-toggler';
import { navigateToId } from '@/utils/navigate-to-id';

export const Header = () => {
	const [showCTA, setShowCTA] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setShowCTA(window.scrollY > window.innerHeight / 2);
		};

		const controller = new AbortController();
		window.addEventListener('scroll', handleScroll, {
			signal: controller.signal
		});

		return () => controller.abort();
	}, []);

	return (
		<div
			className={cn(
				'fixed container-fluid pad-lg z-10 flex-page',
				'transition-all duration-700',
				'dottet-gradient-pre',
				'dotted-gradient'
			)}
		>
			<div className="container-xl pt-6 pb-8 flex justify-between items-center">
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

					<div className="flex flex-row gap-2">
						<div
							className={cn(
								'transition-all duration-700 overflow-hidden it',
								showCTA ? 'w-auto' : 'w-0'
							)}
							style={{
								// @ts-ignore
								interpolateSize: 'allow-keywords'
							}}
						>
							<Button
								variant="solid-weak"
								theme="accent"
								size="md"
								onClick={() => navigateToId('reserve')}
							>
								Rezerviraj termin
							</Button>
						</div>

						<Protected>
							<Link href="/admin">
								<Button variant="solid" theme="neutral" size="md">
									Dashboard
								</Button>
							</Link>
						</Protected>
					</div>
				</div>
			</div>
		</div>
	);
};
