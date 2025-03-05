'use client';

import { Button } from '@/deps/shadcn/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/deps/shadcn/ui/dialog';
import { ChangePasswordForm } from '@/modules/auth/forms/change-password/change-password-form';

export const ChangePasswordButton = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="solid-weak" size="md">
					Change Password
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Event</DialogTitle>
					<DialogDescription>Create a new event.</DialogDescription>
				</DialogHeader>

				<ChangePasswordForm />
			</DialogContent>
		</Dialog>
	);
};
