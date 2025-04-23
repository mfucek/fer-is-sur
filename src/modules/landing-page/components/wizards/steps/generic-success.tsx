import { Button } from '@/deps/shadcn/ui/button';
import { env } from '@/env';
import { Icon } from '@/global/components/icon';
import { Spinner } from '@/global/components/spinner';
import { wizardContext } from '@/global/components/wizard';
import { useContext } from 'react';

const IconInProgress = () => {
	return (
		<div className="size-18 rounded-full bg-info-weak relative">
			<Spinner className="size-6 border-4 border-info" absolutelyCentered />
		</div>
	);
};

const IconSuccess = () => {
	return (
		<div className="p-4 rounded-full bg-success-weak">
			<Icon icon="checkmark" className="size-10 bg-success" />
		</div>
	);
};

const ContentInProgress = () => {
	return (
		<>
			<IconInProgress />
			<div className="flex flex-col gap-1">
				<p className="title-3 text-neutral-strong">Plaćanje u tijeku</p>
				<p className="body-1 text-neutral">
					Pratite uputstva na Stripe prozoru.
				</p>
			</div>
		</>
	);
};

export const ContentSuccess = () => {
	return (
		<>
			<IconSuccess />
			<div className="flex flex-col gap-1 w-full items-center">
				<p className="title-3 text-neutral-strong">Rezervacija uspješna!</p>
				<p className="body-1 text-neutral container-xs text-center">
					Na email su Vam poslani račun i uputstva za eventualno otkazivanje.
				</p>
			</div>

			<Button
				variant="outline"
				theme="neutral"
				onClick={() =>
					(window.location.href = `${env.NEXT_PUBLIC_URL}#reserve`)
				}
			>
				Istraži druge termine
			</Button>
		</>
	);
};

export const GenericSuccessWizardStep = () => {
	const { setCurrentStep } = useContext(wizardContext);

	return (
		<>
			<div className="h-full flex flex-col items-center justify-center text-center gap-10 bg-section rounded-2xl">
				<IconSuccess />
				<div className="flex flex-col gap-1 w-full items-center">
					<p className="title-3 text-neutral-strong">Zahtjev za plaćanje</p>
					<p className="body-1 text-neutral container-xs text-center">
						Pratite uputstva na Stripe prozoru.
					</p>
				</div>

				<Button
					variant="outline"
					theme="neutral"
					onClick={() => setCurrentStep(1)}
				>
					Nazad na kalendar
				</Button>
			</div>
		</>
	);
};
