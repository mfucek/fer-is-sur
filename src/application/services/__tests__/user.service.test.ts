import { beforeEach, describe, expect, it, vi } from 'vitest';
import { User } from '../../../domain/entities/user.entity';
import { IUserRepository } from '../../../domain/repositories/iuser.repository';
import { UserService } from '../user.service';

const mockUser: User = {
	id: '1',
	email: 'test@example.com',
	password: 'hashed',
	createdAt: new Date(),
	updatedAt: new Date()
};

describe('UserService', () => {
	let userRepository: IUserRepository;
	let service: UserService;

	beforeEach(() => {
		userRepository = {
			findById: vi.fn().mockResolvedValue(mockUser),
			findByEmail: vi.fn().mockResolvedValue(mockUser),
			list: vi.fn().mockResolvedValue([mockUser]),
			create: vi.fn().mockResolvedValue(mockUser),
			delete: vi.fn().mockResolvedValue(undefined)
		};
		service = new UserService(userRepository);
	});

	it('should list users', async () => {
		const result = await service.listUsers();
		expect(result).toEqual([mockUser]);
		expect(userRepository.list).toHaveBeenCalled();
	});

	it('should get a user by id', async () => {
		const result = await service.getUser('1');
		expect(result).toEqual(mockUser);
		expect(userRepository.findById).toHaveBeenCalledWith('1');
	});

	it('should get a user by email', async () => {
		const result = await service.getUserByEmail('test@example.com');
		expect(result).toEqual(mockUser);
		expect(userRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
	});

	it('should create a user', async () => {
		const data = { email: 'test@example.com', password: 'pw' };
		const result = await service.createUser(data);
		expect(result).toEqual(mockUser);
		expect(userRepository.create).toHaveBeenCalledWith(data);
	});

	it('should delete a user', async () => {
		await service.deleteUser('1');
		expect(userRepository.delete).toHaveBeenCalledWith('1');
	});
});
