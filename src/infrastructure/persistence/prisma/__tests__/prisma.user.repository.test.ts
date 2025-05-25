import { PrismaClient } from '@prisma/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PrismaUserRepository } from '../prisma.user.repository';

const mockUser = {
	id: '1',
	email: 'test@example.com',
	password: 'hashed',
	createdAt: new Date(),
	updatedAt: new Date()
};

describe('PrismaUserRepository', () => {
	let prisma: PrismaClient;
	let repo: PrismaUserRepository;

	beforeEach(() => {
		prisma = {
			user: {
				findUnique: vi.fn().mockResolvedValue(mockUser),
				findMany: vi.fn().mockResolvedValue([mockUser]),
				create: vi.fn().mockResolvedValue(mockUser),
				delete: vi.fn().mockResolvedValue(undefined)
			}
		} as any;
		repo = new PrismaUserRepository(prisma);
	});

	it('should find a user by id', async () => {
		const result = await repo.findById('1');
		expect(result).toEqual(mockUser);
		expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
	});

	it('should find a user by email', async () => {
		const result = await repo.findByEmail('test@example.com');
		expect(result).toEqual(mockUser);
		expect(prisma.user.findUnique).toHaveBeenCalledWith({
			where: { email: 'test@example.com' }
		});
	});

	it('should list all users', async () => {
		const result = await repo.list();
		expect(result).toEqual([mockUser]);
		expect(prisma.user.findMany).toHaveBeenCalled();
	});

	it('should create a user', async () => {
		const data = { email: 'test@example.com', password: 'pw' };
		const result = await repo.create(data);
		expect(result).toEqual(mockUser);
		expect(prisma.user.create).toHaveBeenCalledWith({ data });
	});

	it('should delete a user', async () => {
		await repo.delete('1');
		expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: '1' } });
	});
});
