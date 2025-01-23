import Link from 'next/link';
import { type FC, type HTMLAttributes } from 'react';

import { Icon, IconName } from '@/global/components/icon';
import { cn } from '@/lib/shadcn/utils';

interface CardProps {
	icon?: IconName;
	label: string;
	href: string;
}

export const DashboardCard: FC<HTMLAttributes<HTMLDivElement> & CardProps> = ({
	children,
	className,
	icon,
	label,
	href,
	...rest
}) => {
	return (
		<Link href={href}>
			<div
				className={cn(
					'py-6 md:py-10 px-6 rounded-xl bg-section flex flex-row gap-3 items-center clickable',
					className
				)}
				{...rest}
			>
				{icon && (
					<div className="w-10 h-10 rounded-lg bg-neutral-weak flex justify-center items-center">
						<Icon icon={icon} size={20} />
					</div>
				)}
				<div className="flex flex-col">
					<p className="button-lg text-neutral">{label}</p>
					<p className="caption text-neutral-strong">{href}</p>
				</div>
				{children}
			</div>
		</Link>
	);
};
