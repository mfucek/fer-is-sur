export const FormLabel = ({
	title,
	error,
	children
}: {
	title?: string;
	error?: string;
	children: React.ReactNode;
}) => {
	return (
		<div className="flex flex-col gap-1 w-full">
			{title && <p className="caption">{title}</p>}
			{children}
			{error && <p className="body-2 text-danger">{error}</p>}
		</div>
	);
};
