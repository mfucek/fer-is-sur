'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { env } from '@/env';
import { Icon } from '@/global/components/icon';
import { useNotifyParent } from '@/utils/open-temporary-tab';

const IconSuccess = () => {
	return (
		<div className="p-4 rounded-full bg-success-weak">
			<Icon icon="checkmark" className="size-10 bg-success" />
		</div>
	);
};

export const SuccessPage = () => {
	useNotifyParent('payment_complete');

	return (
		<div className="flex-page py-40 items-center justify-center text-center gap-10 w-full">
			<IconSuccess />
			<div className="flex flex-col gap-1 w-full items-center">
				<p className="title-3 text-neutral-strong">Kupnja uspješna!</p>
				<p className="body-1 text-neutral container-xs text-center">
					Na email Vam je poslan račun.
				</p>
			</div>

			<Button
				variant="outline"
				theme="neutral"
				onClick={() => (window.location.href = `${env.NEXT_PUBLIC_URL}`)}
			>
				Nazad na stranicu
			</Button>
		</div>
	);
};
