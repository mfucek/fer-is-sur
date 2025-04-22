'use client';

import { ContentSuccess } from '@/modules/landing-page/components/wizards/steps/event-payment-status';

export const SuccessPage = () => {
	return (
		<div className="flex-page py-40 items-center justify-center text-center gap-10 w-full">
			<ContentSuccess />
		</div>
	);
};
