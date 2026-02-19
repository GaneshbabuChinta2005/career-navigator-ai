import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    estimatedHours: Number,
    completed: {
        type: Boolean,
        default: false
    }
});

const resourceSchema = new mongoose.Schema({
    title: String,
    type: String,
    url: String
});

const weekSchema = new mongoose.Schema({
    weekNumber: Number,
    focus: String,
    goals: [String],
    tasks: [taskSchema],
    resources: [resourceSchema]
});

const roadmapSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    targetRole: String,
    timeline: Number,
    weeks: [weekSchema],
    progress: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'archived'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Roadmap = mongoose.model('Roadmap', roadmapSchema);
export default Roadmap;
