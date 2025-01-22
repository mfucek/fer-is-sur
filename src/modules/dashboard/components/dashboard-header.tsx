'use client';

import { ContentPadding } from '@/global/components/content-padding';
import { Icon } from '@/global/components/icon';
import { Button } from '@/lib/shadcn/ui/button';
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
		<ContentPadding className="flex flex-row items-center">
			<div className="flex flex-row items-center gap-2 flex-1">
				{!isOnDashboardHome && (
					<Link href="/admin">
						<Button variant="ghost" size="lg" iconOnly>
							<Icon icon="arrow-back" />
						</Button>
					</Link>
				)}
				<h1 className="display-3">{title}</h1>
			</div>
			{children && <div className="shrink-0">{children}</div>}
		</ContentPadding>
	);
};
