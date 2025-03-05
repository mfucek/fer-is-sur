'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { api } from '@/deps/trpc/react';
import { useRouter } from 'next/navigation';

export const LogOutButton = () => {
	const { mutateAsync: logOut } = api.auth.logOut.useMutation();
	const router = useRouter();

	const handleLogOut = async () => {
		await logOut();
		router.push('/login');
	};
	return (
		<Button
			variant="solid"
			size="md"
			rightIcon="log-out"
			onClick={handleLogOut}
		>
			Log out
		</Button>
	);
};
