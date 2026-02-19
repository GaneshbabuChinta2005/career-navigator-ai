import mongoose, { Schema, Document } from 'mongoose';

export interface IJobMatch extends Document {
    user: mongoose.Types.ObjectId;
    jobTitle: string;
    company?: string;
    jobDescription: string;
    matchScore: number;
    matchingSkills: string[];
    missingSkills: string[];
    aiRecommendation: string;
    priority: 'high' | 'medium' | 'low';
    matchedAt: Date;
}

const JobMatchSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    company: String,
    jobDescription: {
        type: String,
        required: true
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    matchingSkills: [String],
    missingSkills: [String],
    aiRecommendation: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        default: 'medium'
    },
    matchedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<IJobMatch>('JobMatch', JobMatchSchema);
