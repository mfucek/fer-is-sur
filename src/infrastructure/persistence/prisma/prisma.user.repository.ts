import { User } from '@/domain/entities/user.entity';
import { IUserRepository } from '@/domain/repositories/iuser.repository';
import { PrismaClient } from '@prisma/client';

export class PrismaUserRepository implements IUserRepository {
	constructor(private prisma: PrismaClient) {}

	async findById(id: string): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { id } });
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { email } });
	}

	async list(): Promise<User[]> {
		return this.prisma.user.findMany();
	}

	async create(data: { email: string; password: string }): Promise<User> {
		return this.prisma.user.create({
			data: { email: data.email, password: data.password }
		});
	}

	async delete(id: string): Promise<void> {
		await this.prisma.user.delete({ where: { id } });
	}
}
