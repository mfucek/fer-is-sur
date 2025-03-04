import { User } from '@prisma/client';
import { compare } from 'bcrypt';

export const comparePassword = async (user: User, password: string) => {
	return await compare(password, user.password);
};
