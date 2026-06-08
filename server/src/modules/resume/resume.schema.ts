import mongoose, { Schema, Document } from 'mongoose';

export interface IResume extends Document {
    user: mongoose.Types.ObjectId;
    filename: string;
    fileUrl: string;
    extractedText: string;
    fileSize: number;
    mimeType: string;
    uploadedAt: Date;
}

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
    prioritySkills: Array<{ skill: string; importance: string; timeToLearn: string }>;
    analyzedAt: Date;
}

const ResumeSchema = new Schema<IResume>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    filename: { type: String, required: true },
    fileUrl: { type: String, required: true },
    extractedText: { type: String, required: true },
    fileSize: { type: Number, required: true },
    mimeType: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
});

const SkillSchema = new Schema({
    name: { type: String, required: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'], required: true },
    category: { type: String, required: true },
    yearsOfExperience: Number,
});

const SkillAnalysisSchema = new Schema<ISkillAnalysis>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    resume: { type: Schema.Types.ObjectId, ref: 'Resume' },
    targetRole: { type: String, required: true },
    detectedSkills: [SkillSchema],
    missingSkills: [String],
    matchingSkills: [String],
    readinessScore: { type: Number, min: 0, max: 100, required: true },
    recommendations: [String],
    prioritySkills: [{ skill: String, importance: String, timeToLearn: String }],
    analyzedAt: { type: Date, default: Date.now },
});

export const Resume = mongoose.model<IResume>('Resume', ResumeSchema);
export const SkillAnalysis = mongoose.model<ISkillAnalysis>('SkillAnalysis', SkillAnalysisSchema);
