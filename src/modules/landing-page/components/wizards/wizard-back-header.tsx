'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { wizardContext } from '@/global/components/wizard';
import { FC, useContext } from 'react';

export const WizardBackHeader: FC<{
	title: string;
	backStep: number;
}> = ({ title, backStep }) => {
	const { setCurrentStep } = useContext(wizardContext);

	return (
		<div className="flex flex-row items-center gap-2">
			<Button
				variant={'ghost'}
				size="lg"
				singleIcon="arrow-left"
				onClick={() => setCurrentStep(backStep)}
			/>
			<p className="title-3 text-neutral-strong">{title}</p>
		</div>
	);
};
