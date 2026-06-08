import mongoose, { Document } from 'mongoose';

export interface IRoadmapTask {
    title: string;
    description: string;
    estimatedHours: number;
    completed: boolean;
}

export interface IRoadmapWeek {
    weekNumber: number;
    focus: string;
    goals: string[];
    tasks: IRoadmapTask[];
    resources: Array<{ title: string; type: string; url: string }>;
}

export interface IRoadmap extends Document {
    user: mongoose.Types.ObjectId;
    targetRole: string;
    timeline: number;
    weeks: IRoadmapWeek[];
    progress: number;
    status: 'active' | 'completed' | 'archived';
    createdAt: Date;
}

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    estimatedHours: Number,
    completed: { type: Boolean, default: false },
});

const resourceSchema = new mongoose.Schema({ title: String, type: String, url: String });

const weekSchema = new mongoose.Schema({
    weekNumber: Number,
    focus: String,
    goals: [String],
    tasks: [taskSchema],
    resources: [resourceSchema],
});

const roadmapSchema = new mongoose.Schema<IRoadmap>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    targetRole: String,
    timeline: Number,
    weeks: [weekSchema],
    progress: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'completed', 'archived'], default: 'active' },
    createdAt: { type: Date, default: Date.now },
});

const Roadmap = mongoose.model<IRoadmap>('Roadmap', roadmapSchema);
export default Roadmap;
