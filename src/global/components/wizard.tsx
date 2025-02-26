import { cn } from '@/deps/shadcn/utils';
import { createContext, FC, HTMLAttributes, useContext, useState } from 'react';

export const wizardContext = createContext<{
	currentStep: number;
	setCurrentStep: (step: number) => void;
	totalSteps: number;
}>({
	currentStep: 1,
	setCurrentStep: () => {},
	totalSteps: 0
});

const WizardProvider: FC<{ children: React.ReactNode; totalSteps: number }> = ({
	children,
	totalSteps
}) => {
	const [currentStep, setCurrentStep] = useState(1);

	return (
		<wizardContext.Provider value={{ currentStep, setCurrentStep, totalSteps }}>
			{children}
		</wizardContext.Provider>
	);
};

export const Wizard: FC<
	HTMLAttributes<HTMLDivElement> & {
		totalSteps: number;
	}
> = ({ children, className, totalSteps, ...props }) => {
	return (
		<WizardProvider totalSteps={totalSteps}>
			<div className={cn('flex flex-row items-center', className)} {...props}>
				{children}
			</div>
		</WizardProvider>
	);
};

export const WizardStep: FC<{ step: number; children: React.ReactNode }> = ({
	step,
	children
}) => {
	const { currentStep, setCurrentStep } = useContext(wizardContext);

	const isActive = currentStep === step;
	const isBehind = currentStep > step;
	const isAhead = currentStep < step;

	return (
		<div
			className={cn(
				'flex flex-col gap-10 w-full shrink-0 [&:not(:first-child)]:ml-[-100%]',
				'transition-all duration-600 ease-[cubic-bezier(0.25, 0.1, 0.25, 1)]',
				isActive && 'scale-100',
				isBehind && 'scale-110 opacity-0 pointer-events-none',
				isAhead && 'scale-90 opacity-0 pointer-events-none'
			)}
		>
			{children}
		</div>
	);
};
