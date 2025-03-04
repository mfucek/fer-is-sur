import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const jwtSecret = process.env.JWT_SECRET!;

export type SafeUser = Omit<User, 'password'>;

export type Session = {
	user: SafeUser;
};

export const setSessionCookie = async (user: SafeUser) => {
	console.log('setting session cookie');

	const c = await cookies();
	c.set('test', 'test');

	const newSession: Session = {
		user: {
			id: user.id,
			email: user.email,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt
		}
	};

	const token = jwt.sign(newSession, jwtSecret, { expiresIn: '7d' }); // 1 week
	c.set('session', token, { secure: true });

	return newSession;
};

export const removeSessionCookie = async () => {
	const c = await cookies();

	c.delete('session');
};

export const getSessionCookie = async (): Promise<Session | null> => {
	const c = await cookies();

	const token = c.get('session')?.value;

	if (!token || !jwtSecret) return null;

	try {
		jwt.verify(token, jwtSecret);
	} catch (e) {
		return null;
	}

	const session = jwt.decode(token, { json: true }) as Session;

	return session;
};
