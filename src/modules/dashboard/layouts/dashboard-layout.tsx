import { getSessionCookie } from '@/modules/auth/api/session';
import { redirect } from 'next/navigation';

export const DashboardLayout = async ({
	children
}: {
	children: React.ReactNode;
}) => {
	const session = await getSessionCookie();

	if (!session) {
		redirect('/login');
	}

	return <div className="flex-page gap-10 py-20">{children}</div>;
};
