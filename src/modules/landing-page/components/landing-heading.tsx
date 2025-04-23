import { cn } from '@/deps/shadcn/utils';
import { FC, HTMLAttributes } from 'react';

export const LandingHeading: FC<
	HTMLAttributes<HTMLDivElement> & {
		title: string;
		description?: string;
	}
> = ({ title, description, ...props }) => {
	const lines = description?.split('\n');

	return (
		<div className="flex flex-col items-center gap-3 w-full" {...props}>
			<h2 className="container-lg pad-lg display-2 text-center text-neutral">
				{title}
			</h2>
			{description &&
				lines?.map((line, index) => (
					<p
						className={cn(
							'container-sm pad-lg body-1 text-neutral-strong text-center',
							index < lines.length - 1 && 'mb-1'
						)}
						key={index}
					>
						{line}
					</p>
				))}
		</div>
	);
};
