import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = loginSchema.extend({
    name: z.string().min(2, 'Name must be at least 2 characters'),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegisterCredentials = z.infer<typeof registerSchema>;

export interface AuthResponse {
    user: {
        id: string;
        name: string;
        email: string;
        role: 'student' | 'admin';
    };
    token: string;
}
