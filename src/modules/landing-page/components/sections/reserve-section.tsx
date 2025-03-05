import { ReservationWizard } from '../reservation-wizard';

export const ReserveSection = () => {
	return (
		<div className="flex-page py-20 gap-10" id="reserve">
			<div className="flex flex-col gap-2 flex-page">
				<h2 className="container-md display-3 text-neutral text-center">
					Želiš sudjelovati?
				</h2>
				<p className="container-xs body-2 text-neutral-strong text-center">
					Rezerviraj jedan od dostupnih termina!
				</p>
			</div>

			<ReservationWizard />
		</div>
	);
};
