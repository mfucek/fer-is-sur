import { Container } from '@/global/components/container';

export const DashboardLayout = ({
	children
}: {
	children: React.ReactNode;
}) => {
	return (
		<div className="flex flex-col items-center py-20">
			<Container>{children}</Container>
		</div>
	);
};
