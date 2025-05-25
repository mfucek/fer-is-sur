import { beforeEach, describe, expect, it, vi } from 'vitest';
import { User } from '../../../../domain/entities/user.entity';
import { userRouter } from '../user.router';

const mockUser: User = {
	id: '1',
	email: 'test@example.com',
	password: 'hashed',
	createdAt: new Date(),
	updatedAt: new Date()
};

describe('userRouter', () => {
	let ctx: any;
	let caller: ReturnType<typeof userRouter.createCaller>;

	beforeEach(() => {
		ctx = {
			userService: {
				listUsers: vi.fn().mockResolvedValue([mockUser]),
				getUser: vi.fn().mockResolvedValue(mockUser),
				createUser: vi.fn().mockResolvedValue(mockUser),
				deleteUser: vi.fn().mockResolvedValue(undefined)
			}
		};
		caller = userRouter.createCaller(ctx);
	});

	it('should list users', async () => {
		const result = await caller.list();
		expect(result).toEqual([mockUser]);
		expect(ctx.userService.listUsers).toHaveBeenCalled();
	});

	it('should get a user by id', async () => {
		const result = await caller.get('1');
		expect(result).toEqual(mockUser);
		expect(ctx.userService.getUser).toHaveBeenCalledWith('1');
	});

	it('should create a user', async () => {
		const data = { email: 'test@example.com', password: 'pw' };
		const result = await caller.create(data);
		expect(result).toEqual(mockUser);
		expect(ctx.userService.createUser).toHaveBeenCalledWith(data);
	});

	it('should delete a user', async () => {
		const result = await caller.delete('1');
		expect(result).toEqual({ success: true });
		expect(ctx.userService.deleteUser).toHaveBeenCalledWith('1');
	});
});
