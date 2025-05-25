import { User } from '../entities/user.entity';

export interface IUserRepository {
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	list(): Promise<User[]>;
	create(data: { email: string; password: string }): Promise<User>;
	delete(id: string): Promise<void>;
}
