import mongoose, { Schema, Document } from 'mongoose';

export interface IInterviewFeedback extends Document {
    user: mongoose.Types.ObjectId;
    company: string;
    position: string;
    date: Date;
    questions: string[];
    performance: 'poor' | 'average' | 'good' | 'excellent';
    weaknesses: string[];
    strengths: string[];
    notes: string;
    createdAt: Date;
}

const InterviewFeedbackSchema = new Schema<IInterviewFeedback>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    company: { type: String, required: true },
    position: { type: String, required: true },
    date: { type: Date, required: true },
    questions: [String],
    performance: { type: String, enum: ['poor', 'average', 'good', 'excellent'], required: true },
    weaknesses: [String],
    strengths: [String],
    notes: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
});

export const InterviewFeedback = mongoose.model<IInterviewFeedback>('InterviewFeedback', InterviewFeedbackSchema);
