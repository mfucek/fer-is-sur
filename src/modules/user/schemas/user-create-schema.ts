import { z } from 'zod';

export const userCreateSchema = z.object({
	email: z.string().email()
});

export type TUserCreateSchema = z.infer<typeof userCreateSchema>;
