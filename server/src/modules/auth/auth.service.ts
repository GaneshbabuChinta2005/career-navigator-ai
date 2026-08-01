import jwt from 'jsonwebtoken';
import { AppError } from '../../core/errors';
import { authRepository } from './auth.repository';
import { SignupDto, LoginDto, AuthResponseDto, toAuthResponseDto } from './auth.dto';

const signToken = (id: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '90d',
    } as jwt.SignOptions);
};

/**
 * Auth Service — business logic for authentication.
 */
export class AuthService {
    async signup(dto: SignupDto): Promise<AuthResponseDto> {
        const existing = await authRepository.findByEmail(dto.email);
        if (existing) {
            throw new AppError('A user with this email already exists.', 409);
        }

        const user = await authRepository.create(dto);
        const token = signToken((user as any)._id.toString());
        return toAuthResponseDto(user, token);
    }

    async login(dto: LoginDto): Promise<AuthResponseDto> {
        if (!dto.email || !dto.password) {
            throw new AppError('Please provide email and password', 400);
        }

        const user = await authRepository.findByEmail(dto.email, true);
        if (!user || !(await user.correctPassword(dto.password, user.password))) {
            throw new AppError('Incorrect email or password', 401);
        }

        // Fire-and-forget: update last active
        authRepository.updateLastActive((user as any)._id.toString()).catch(console.error);

        const token = signToken((user as any)._id.toString());
        return toAuthResponseDto(user, token);
    }

    async getMe(userId: string): Promise<AuthResponseDto['user']> {
        const user = await authRepository.findById(userId);
        if (!user) throw new AppError('User not found', 404);
        return toAuthResponseDto(user, '').user;
    }
}

export const authService = new AuthService();
