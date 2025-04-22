import { CreateUserButton } from '@/modules/user/components/create-user-button';
import { UsersList } from '@/modules/user/components/users-list';
import { DashboardHeader } from '../components/dashboard-header';

export const UsersDashboardPage = () => {
	return (
		<>
			<div className="container-md pad-sm">
				<DashboardHeader title="Users">
					<CreateUserButton />
				</DashboardHeader>
			</div>

			<div className="container-md pad-sm flex flex-col gap-10">
				<UsersList />
			</div>
		</>
	);
};
