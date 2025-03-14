import { cn } from '@/deps/shadcn/utils';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';

export const Wrapper: FC<PropsWithChildren> = ({ children }) => (
	<html lang="en">
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
			<title />
		</head>
		<body className="bg-[#f9f9f9] px-4 py-8">
			{children}
			<div className="hidden">{new Date().toISOString()}</div>
		</body>
	</html>
);

export const Button: FC<
	HTMLAttributes<HTMLAnchorElement> & {
		href: string;
	}
> = ({ href, className, ...props }) => (
	<a
		href={href}
		className={cn(
			'rounded-lg border border-neutral-weak bg-section p-6',
			className
		)}
		{...props}
	/>
);

export const Card: FC<HTMLAttributes<HTMLDivElement>> = ({
	style,
	className,
	...props
}) => (
	<div
		className={cn(
			'rounded-lg border border-[#00000010] bg-[#ffffff] p-6',
			className
		)}
		{...props}
	/>
);

export const Container: FC<HTMLAttributes<HTMLDivElement>> = ({
	style,
	...props
}) => <div className="mx-auto w-full max-w-4xl" {...props} />;
