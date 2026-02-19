import mongoose, { Schema, Document } from 'mongoose';

export interface IInterviewFeedback extends Document {
    user: mongoose.Types.ObjectId;
    company: string;
    position: string;
    date: Date;
    questions: string[];
    performance: {
        technical: number;
        behavioral: number;
        communication: number;
    };
    weaknesses: string[];
    strengths: string[];
    notes: string;
    createdAt: Date;
}

const InterviewFeedbackSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    questions: [String],
    performance: {
        technical: { type: Number, min: 0, max: 10, required: true },
        behavioral: { type: Number, min: 0, max: 10, required: true },
        communication: { type: Number, min: 0, max: 10, required: true }
    },
    weaknesses: [String],
    strengths: [String],
    notes: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<IInterviewFeedback>('InterviewFeedback', InterviewFeedbackSchema);
