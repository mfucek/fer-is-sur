import { FC, PropsWithChildren } from 'react';

export const NewsletterButton: FC<
	PropsWithChildren & {
		href: string;
	}
> = ({ children, href }) => {
	return (
		<>
			<p
				style={{
					padding: '8px 0',
					textAlign: 'right'
				}}
			>
				<a
					href={href}
					style={{
						padding: '8px 16px',
						color: '#ffffff',
						backgroundColor: '#000000',
						borderRadius: '6px',
						fontWeight: 'bold',
						textDecoration: 'none'
					}}
				>
					{children}
				</a>
			</p>
		</>
	);
};
