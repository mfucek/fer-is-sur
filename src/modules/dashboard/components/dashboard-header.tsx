'use client';

import { Button } from '@/deps/shadcn/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export const DashboardHeader = ({
	title,
	children
}: {
	title: string;
	children?: ReactNode;
}) => {
	const pathname = usePathname();
	const isOnDashboardHome = pathname === '/admin';

	return (
		<div className="flex flex-row items-center w-full min-h-[52px]">
			<div className="flex flex-row items-center gap-2 flex-1">
				{!isOnDashboardHome && (
					<Link href="/admin">
						<Button variant="ghost" size="lg" singleIcon="arrow-back" />
					</Link>
				)}
				<h1 className="display-3 text-neutral">{title}</h1>
			</div>
			{children && <div className="shrink-0">{children}</div>}
		</div>
	);
};
