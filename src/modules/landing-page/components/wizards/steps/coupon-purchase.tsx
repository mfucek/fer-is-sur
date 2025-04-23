import { wizardContext } from '@/global/components/wizard';
import { CouponPurchaseForm } from '@/modules/coupon/forms/purchase-coupon/coupon-purchase-form';
import { useContext } from 'react';
import { WizardBackHeader } from '../wizard-back-header';

export const CouponPurchaseWizardStep = () => {
	const { setCurrentStep } = useContext(wizardContext);

	return (
		<>
			<WizardBackHeader backStep={1} title="Kupnja kupona" />

			<CouponPurchaseForm
				onPurchaseSubmit={() => {
					setCurrentStep(6);
				}}
			/>
		</>
	);
};
