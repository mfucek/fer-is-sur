'use client';

import { type FC } from 'react';

import { Button } from '@/deps/shadcn/ui/button';
import { User } from '@/domain/entities/user.entity';
import {
	Actions,
	ActionsLabel,
	Content,
	Data,
	Item,
	Items,
	Label,
	Labels,
	List
} from '@/global/components/list';
import { Spinner } from '@/global/components/spinner';
import { api } from '@/presentation/api/trpc/react';
import { ListUsersItemDTO } from '../api/procedures/list';

const UserRowActions: FC<{ data: ListUsersItemDTO }> = ({ data }) => {
	const utils = api.useUtils();
	const { mutateAsync: deleteUser, isPending } = api.user.delete.useMutation();

	const handleDelete = async () => {
		try {
			await deleteUser(data.id);
		} catch (error) {
			console.error(error);
		} finally {
			await utils.user.list.invalidate();
		}
	};

	return (
		<>
			<Button
				variant="solid-weak"
				theme="danger"
				onClick={handleDelete}
				singleIcon="trash"
				size="sm"
				loading={isPending}
			/>
		</>
	);
};

export const UsersList = () => {
	const { data, isLoading } = api.user.list.useQuery();

	return (
		<List>
			<Labels>
				<Label>Email</Label>
				<ActionsLabel />
			</Labels>
			<Items>
				{(!data || isLoading) && (
					<Item>
						<Data>
							<Spinner absolutelyCentered />
						</Data>
					</Item>
				)}

				{data &&
					data.map((user: User) => {
						return (
							<Item key={user.id}>
								<Content>
									<Data strong>{user.email}</Data>
								</Content>
								<Actions>
									<UserRowActions data={user} />
								</Actions>
							</Item>
						);
					})}
			</Items>
		</List>
	);
};
