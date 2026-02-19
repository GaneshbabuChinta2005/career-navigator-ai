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

const ResumeSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    filename: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    extractedText: {
        type: String,
        required: true
    },
    fileSize: {
        type: Number,
        required: true
    },
    mimeType: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<IResume>('Resume', ResumeSchema);
