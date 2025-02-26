import * as React from 'react';

import { cn } from '@/deps/shadcn/utils';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-10 w-full rounded-lg border border-neutral-medium focus:border-neutral-strong bg-section px-3 py-2 file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-neutral-medium disabled:cursor-not-allowed disabled:opacity-50 input text-neutral',
					'transition-all duration-100 ease-in-out',
					'focus-visible:outline-neutral focus-visible:outline-offset-2 outline-offset-2 focus-visible:outline-2',
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = 'Input';

export { Input };
