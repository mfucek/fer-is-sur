import { Card } from './email';
import { Icon } from './email-icon';

export const EventCard = () => {
	return (
		<Card className="px-4">
			<div className="flex flex-row items-center">
				<div className="px-6">
					<div className="px-1 py-[2px] rounded-full bg-success-weak text-success mb-1">
						Rezervacija potvrđena!
						<Icon icon="checkmark" size={24} color="#359a73" />
					</div>
					<p>Potions & Paint - Jinx</p>
				</div>

				<div className="h-10 w-px bg-[#00000010]" />

				<div className="px-6">
					<div className="flex flex-row gap-1 mb-1">
						<Icon icon="location" size={24} color="#00000050" />
						{/* <img src="cid:test" height={40} width={40} /> */}
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
