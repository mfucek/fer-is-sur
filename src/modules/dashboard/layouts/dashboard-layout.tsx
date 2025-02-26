export const DashboardLayout = ({
	children
}: {
	children: React.ReactNode;
}) => {
	return <div className="flex-page gap-10 py-20">{children}</div>;
};
