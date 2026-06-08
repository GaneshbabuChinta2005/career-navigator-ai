import { IUserDocument } from './auth.schema';

export interface SignupDto {
    name: string;
    email: string;
    password: string;
    targetRole?: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface AuthResponseDto {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
        avatarUrl?: string;
        targetRole?: string;
        streakCount: number;
    };
}

export const toAuthResponseDto = (user: IUserDocument, token: string): AuthResponseDto => ({
    token,
    user: {
        id: (user as any)._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
        targetRole: user.targetRole,
        streakCount: user.streakCount,
    },
});
