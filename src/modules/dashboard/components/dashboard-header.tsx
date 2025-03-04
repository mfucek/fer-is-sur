'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { api } from '@/deps/trpc/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export const DashboardHeader = ({
	title,
	children
}: {
	title: string;
	children?: ReactNode;
}) => {
	const pathname = usePathname();
	const isOnDashboardHome = pathname === '/admin';

	const { data: me } = api.auth.me.useQuery();

	const { mutateAsync: logOut } = api.auth.logOut.useMutation();
	const router = useRouter();

	const handleLogOut = async () => {
		await logOut();
		router.push('/login');
	};

	return (
		<div className="flex flex-row items-center w-full min-h-[52px]">
			<div className="flex flex-row items-center gap-2 flex-1">
				{!isOnDashboardHome && (
					<Link href="/admin">
						<Button variant="ghost" size="lg" singleIcon="arrow-back" />
					</Link>
				)}
				<h1 className="display-3 text-neutral">{title}</h1>
			</div>

			{children && <div className="shrink-0">{children}</div>}

			{me?.loggedIn && (
				<Button
					variant="solid-weak"
					size="md"
					rightIcon="log-out"
					onClick={handleLogOut}
				>
					Log out
				</Button>
			)}
		</div>
	);
};
