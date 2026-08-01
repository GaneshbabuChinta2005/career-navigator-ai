import { generateStructuredContent } from '../../core/ai';
import { AppError } from '../../core/errors';
import { interviewRepository } from './interview.repository';

export class InterviewService {
    async addFeedback(userId: string, data: any) {
        const { company, position, date, performance } = data;
        if (!company || !position || !date || !performance) {
            throw new AppError('Company, position, date, and performance are required', 400);
        }
        return interviewRepository.create({ ...data, user: userId as any });
    }

    async getAllFeedback(userId: string) {
        return interviewRepository.findByUser(userId);
    }

    async getPatterns(userId: string) {
        const feedbacks = await interviewRepository.findLatest(userId, 10);
        if (feedbacks.length === 0) throw new AppError('No interview feedback found', 404);

        return generateStructuredContent<any>(`
You are a career coach analyzing interview performance patterns.
INTERVIEW HISTORY: ${JSON.stringify(feedbacks, null, 2)}
Return ONLY valid JSON:
{
  "recurringWeaknesses": [{ "area": "string", "frequency": number, "impact": "high|medium|low" }],
  "strengths": ["string"],
  "recommendations": ["string"],
  "overallTrend": "improving|stable|declining"
}`);
    }

    async updateFeedback(userId: string, feedbackId: string, data: any) {
        const feedback = await interviewRepository.update(userId, feedbackId, data);
        if (!feedback) throw new AppError('Feedback not found', 404);
        return feedback;
    }

    async deleteFeedback(userId: string, feedbackId: string) {
        const feedback = await interviewRepository.delete(userId, feedbackId);
        if (!feedback) throw new AppError('Feedback not found', 404);
    }
}

export const interviewService = new InterviewService();
