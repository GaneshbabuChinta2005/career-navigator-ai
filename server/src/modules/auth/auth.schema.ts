import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    avatarUrl?: string;
    targetRole?: string;
    skills?: string[];
    streakCount: number;
    lastActiveAt: Date;
    aiVersion: number;
    createdAt: Date;
    correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
}

export interface IUserDocument extends IUser, Document {}

const userSchema = new mongoose.Schema<IUserDocument>({
    name: { type: String, required: [true, 'Please tell us your name!'] },
    email: { type: String, required: [true, 'Please provide your email'], unique: true, lowercase: true },
    password: { type: String, required: [true, 'Please provide a password'], minlength: 8, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatarUrl: String,
    targetRole: { type: String, default: 'Software Engineer' },
    skills: [String],
    streakCount: { type: Number, default: 0 },
    lastActiveAt: { type: Date, default: Date.now },
    aiVersion: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now },
});

// @ts-ignore - Mongoose 9 pre hook type is strict in Express 5 context
userSchema.pre('save', async function (next: any) {
    // @ts-ignore
    if (!this.isModified('password')) return next();
    // @ts-ignore
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword: string,
    userPassword: string
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model<IUserDocument>('User', userSchema);
export default User;
