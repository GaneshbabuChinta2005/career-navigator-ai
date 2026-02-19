import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    avatarUrl?: string;
    targetRole?: string;
    createdAt: Date;
    correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
}

export interface IUserDocument extends IUser, Document { }

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    avatarUrl: String,
    targetRole: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const schema: any = userSchema;
// @ts-ignore
schema.pre('save', async function (this: IUserDocument, next: (err?: any) => void) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

schema.methods.correctPassword = async function (candidatePassword: string, userPassword: string) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model<IUserDocument>('User', userSchema);
export default User;
