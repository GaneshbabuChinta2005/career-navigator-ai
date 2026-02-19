import mongoose, { Schema, Document } from 'mongoose';

interface ISkill {
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    category: string;
    yearsOfExperience?: number;
}

export interface ISkillAnalysis extends Document {
    user: mongoose.Types.ObjectId;
    resume?: mongoose.Types.ObjectId;
    targetRole: string;
    detectedSkills: ISkill[];
    missingSkills: string[];
    matchingSkills: string[];
    readinessScore: number;
    recommendations: string[];
    analyzedAt: Date;
}

const SkillSchema: Schema = new Schema({
    name: { type: String, required: true },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'expert'],
        required: true
    },
    category: { type: String, required: true },
    yearsOfExperience: { type: Number }
});

const SkillAnalysisSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    resume: {
        type: Schema.Types.ObjectId,
        ref: 'Resume'
    },
    targetRole: {
        type: String,
        required: true
    },
    detectedSkills: [SkillSchema],
    missingSkills: [String],
    matchingSkills: [String],
    readinessScore: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    recommendations: [String],
    analyzedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<ISkillAnalysis>('SkillAnalysis', SkillAnalysisSchema);
