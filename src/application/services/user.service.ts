import { User } from '@/domain/entities/user.entity';
import { IUserRepository } from '@/domain/repositories/iuser.repository';

export class UserService {
	constructor(private readonly userRepository: IUserRepository) {}

	async getUser(id: string): Promise<User | null> {
		return this.userRepository.findById(id);
	}

	async getUserByEmail(email: string): Promise<User | null> {
		return this.userRepository.findByEmail(email);
	}

	async listUsers(): Promise<User[]> {
		return this.userRepository.list();
	}

	async createUser(data: { email: string; password: string }): Promise<User> {
		// Add business rules as needed
		return this.userRepository.create(data);
	}

	async deleteUser(id: string): Promise<void> {
		return this.userRepository.delete(id);
	}
}
