import { InterviewFeedback, IInterviewFeedback } from './interview.schema';

export class InterviewRepository {
    async create(data: Partial<IInterviewFeedback>): Promise<IInterviewFeedback> {
        return InterviewFeedback.create(data);
    }

    async findByUser(userId: string): Promise<IInterviewFeedback[]> {
        return InterviewFeedback.find({ user: userId }).sort({ date: -1 }).exec();
    }

    async findLatest(userId: string, limit = 10): Promise<IInterviewFeedback[]> {
        return InterviewFeedback.find({ user: userId }).sort({ date: -1 }).limit(limit).exec();
    }

    async findOne(userId: string, feedbackId: string): Promise<IInterviewFeedback | null> {
        return InterviewFeedback.findOne({ _id: feedbackId, user: userId }).exec();
    }

    async update(userId: string, feedbackId: string, data: Partial<IInterviewFeedback>): Promise<IInterviewFeedback | null> {
        return InterviewFeedback.findOneAndUpdate({ _id: feedbackId, user: userId }, data, { new: true, runValidators: true }).exec();
    }

    async delete(userId: string, feedbackId: string): Promise<IInterviewFeedback | null> {
        return InterviewFeedback.findOneAndDelete({ _id: feedbackId, user: userId }).exec();
    }
}

export const interviewRepository = new InterviewRepository();
