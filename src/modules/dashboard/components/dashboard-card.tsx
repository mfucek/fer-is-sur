import Link from 'next/link';
import { type FC, type HTMLAttributes } from 'react';

import { cn } from '@/deps/shadcn/utils';
import { Icon, IconName } from '@/global/components/icon';

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
					'py-6 md:py-10 px-6 rounded-xl bg-section hover:bg-neutral-weak flex flex-row gap-3 items-center clickable group',
					className
				)}
				{...rest}
			>
				{icon && (
					<div className="size-10 rounded-lg bg-neutral-weak flex justify-center items-center group-hover:bg-neutral-medium duration-300 group-hover:duration-100 group-hover:scale-105">
						<Icon icon={icon} className="size-5 group-hover:scale-105" />
					</div>
				)}
				<div className="flex flex-col">
					<p className="button-md text-neutral">{label}</p>
					<p className="caption text-neutral-strong">{href}</p>
				</div>
				{children}
			</div>
		</Link>
	);
};
