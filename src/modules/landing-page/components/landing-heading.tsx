import { FC, HTMLAttributes } from 'react';

export const LandingHeading: FC<
	HTMLAttributes<HTMLDivElement> & {
		title: string;
		description?: string;
	}
> = ({ title, description, ...props }) => {
	return (
		<div className="flex flex-col items-center gap-3 w-full" {...props}>
			<h2 className="container-lg pad-lg display-2 text-center text-neutral">
				{title}
			</h2>
			{description && (
				<p className="container-xs pad-lg body-1 text-neutral-strong text-center">
					{description}
				</p>
			)}
		</div>
	);
};
