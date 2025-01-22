'use client';

import { ContentPadding } from '@/global/components/content-padding';
import { ReactNode } from 'react';

export const DashboardHeader = ({
	title,
	children
}: {
	title: string;
	children?: ReactNode;
}) => {
	return (
		<ContentPadding className="flex flex-row items-center">
			<h1 className="display-3 flex-1">{title}</h1>
			{children && <div className="shrink-0">{children}</div>}
		</ContentPadding>
	);
};
