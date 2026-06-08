import User, { IUserDocument } from './auth.schema';

/**
 * Auth Repository — data-access layer for user records.
 * No business logic lives here; only DB operations.
 */
export class AuthRepository {
    async findByEmail(email: string, includePassword = false): Promise<IUserDocument | null> {
        const query = User.findOne({ email });
        if (includePassword) query.select('+password');
        return query.exec();
    }

    async findById(id: string): Promise<IUserDocument | null> {
        return User.findById(id).exec();
    }

    async create(data: {
        name: string;
        email: string;
        password: string;
        targetRole?: string;
    }): Promise<IUserDocument> {
        return User.create(data);
    }

    async updateLastActive(id: string): Promise<void> {
        await User.findByIdAndUpdate(id, { lastActiveAt: new Date() });
    }

    async incrementStreak(id: string): Promise<void> {
        await User.findByIdAndUpdate(id, { $inc: { streakCount: 1 } });
    }
}

export const authRepository = new AuthRepository();
