import { cn } from '@/deps/shadcn/utils';
import { FC, HTMLAttributes } from 'react';
import { Button, Card } from './email';

const PurchaseItem = () => {
	return (
		<div className="flex flex-row justify-between">
			<div className="flex flex-row justify-between">
				<p>Rezervacija termina</p>
				<p>2 osobe</p>
			</div>
			<p>35,00 EUR</p>
		</div>
	);
};

const PurchaseSum = () => {
	return (
		<div className="flex flex-row justify-between">
			<p>Total</p>
			<p>22,50 EUR</p>
		</div>
	);
};

export const PurchaseSummaryCard: FC<HTMLAttributes<HTMLDivElement>> = ({
	className,
	...props
}) => {
	return (
		<Card className={cn('pt-5', className)} {...props}>
			<p className="text-center mb-6">
				Hvala na povjerenju, veselimo se druženju!
			</p>

			<div className="px-6 mb-6">
				<PurchaseItem />
				<PurchaseItem />
				<div className="w-full h-px bg-neutral-weak"></div>
				<PurchaseSum />
			</div>

			<div className="p-1">
				<div className="flex flex-row bg-neutral-weak p-3">
					<p className="text-neutral-strong mr-3">
						Otkazivanje je moguće unutar 48h do vremena radionice. Ukoliko imate
						želju otkazati, ljubazno Vas molimo da pratite uputstva na ovom
						linku.
					</p>

					<Button href={'google.com'}>Otkaži rezervaciju</Button>
				</div>
			</div>
		</Card>
	);
};
