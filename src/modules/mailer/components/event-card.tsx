import { cn } from '@/deps/shadcn/utils';
import { FC, HTMLAttributes } from 'react';
import { Card } from './email';
import { Icon } from './email-icon';

export const EventCard: FC<HTMLAttributes<HTMLDivElement>> = ({
	className,
	...props
}) => {
	return (
		<Card className={cn('px-4', className)} {...props}>
			<div className="flex flex-row items-center py-4">
				<div className="px-6 w-full">
					<div className="flex flex-row w-fit items-center gap-[2px] px-1 py-[2px] rounded-full bg-success-weak text-success mb-1">
						<p className="caption">Rezervacija potvrđena!</p>
						<Icon icon="checkmark" size={24} color="#359a73" />
					</div>

					<p className="display-3">Potions & Paint - Jinx</p>
				</div>

				<div className="h-10 w-px bg-[#00000010]" />

				<div className="px-6 shrink-0">
					<div className="flex flex-row gap-1 mb-1">
						<Icon icon="location" size={24} color="#00000050" />
						<p>Savska Cesta 144A</p>
					</div>
					<div className="flex flex-row gap-1">
						<Icon icon="status-pending" size={24} color="#00000050" />
						<p>28. 03. 2025. 11:00</p>
					</div>
				</div>
			</div>
		</Card>
	);
};
