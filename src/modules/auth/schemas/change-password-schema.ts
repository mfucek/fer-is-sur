import { z } from 'zod';

export const changePasswordSchema = z.object({
	oldPassword: z.string(),
	newPassword: z.string().min(1, { message: 'New password is required' })
});

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
