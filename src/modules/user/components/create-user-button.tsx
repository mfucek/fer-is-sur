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
import { Icon } from '@/global/components/icon';
import { CreateUserForm } from '../forms/create-user/create-user-form';

export const CreateUserButton = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="md">
					Create User
					<Icon icon="add" />
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create User</DialogTitle>
					<DialogDescription>Create a new user.</DialogDescription>
				</DialogHeader>

				<CreateUserForm />
			</DialogContent>
		</Dialog>
	);
};
