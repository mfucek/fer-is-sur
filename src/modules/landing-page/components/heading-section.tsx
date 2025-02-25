import { FC, HTMLAttributes } from 'react';

export const HeadingSection: FC<
	HTMLAttributes<HTMLDivElement> & {
		title: string;
		description?: string;
	}
> = ({ title, description, ...props }) => {
	return (
		<div className="flex-page gap-3 py-20" {...props}>
			<h2 className="container-lg pad-lg display-2 text-center text-neutral">
				{title}
			</h2>
			{description && (
				<p className="container-xs pad-lg body-2 text-neutral-strong text-center">
					{description}
				</p>
			)}
		</div>
	);
};
