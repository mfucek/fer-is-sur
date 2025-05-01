'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { cn } from '@/deps/shadcn/utils';
import { api } from '@/deps/trpc/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';

export const DashboardHeader = ({
	title,
	children
}: {
	title: string;
	children?: ReactNode;
}) => {
	const pathname = usePathname();
	const isOnDashboardHome = pathname === '/admin';

	const { data: me } = api.auth.me.useQuery();

	const containerRef = useRef<HTMLDivElement>(null);
	const actionsRef = useRef<HTMLDivElement>(null);

	const [actionsLargerThanContainer, setActionsLargerThanContainer] =
		useState(false);

	useEffect(() => {
		const checkActionsLargerThanContainer = () => {
			if (actionsRef.current && containerRef.current) {
				setActionsLargerThanContainer(
					actionsRef.current.offsetWidth > containerRef.current.offsetWidth
				);
			}
		};

		checkActionsLargerThanContainer();

		window.addEventListener('resize', checkActionsLargerThanContainer);

		return () =>
			window.removeEventListener('resize', checkActionsLargerThanContainer);
	}, []);

	return (
		<div className="flex flex-row items-center justify-between gap-4 min-h-[52px] overflow-hidden">
			<div className="flex flex-row items-center gap-2 shrink-0">
				{!isOnDashboardHome && (
					<Link href="/admin">
						<Button variant="ghost" size="lg" singleIcon="arrow-back" />
					</Link>
				)}
				<h1 className="display-3 text-neutral">{title}</h1>
			</div>

			{children && (
				<div
					className={cn(
						'relative flex-1 flex flex-row gap-2 overflow-x-auto scrollbar-hidden',
						!actionsLargerThanContainer && 'justify-end'
					)}
					ref={containerRef}
				>
					<div className="flex flex-row gap-2 w-fit" ref={actionsRef}>
						{children}
					</div>
				</div>
			)}
		</div>
	);
};
