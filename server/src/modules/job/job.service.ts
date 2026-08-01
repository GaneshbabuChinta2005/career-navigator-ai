import { generateStructuredContent } from '../../core/ai';
import { AppError } from '../../core/errors';
import { jobRepository } from './job.repository';
import { SkillAnalysis } from '../resume/resume.schema';

export class JobService {
    async matchJob(userId: string, jobTitle: string, company: string, jobDescription: string) {
        if (!jobTitle || !jobDescription) throw new AppError('Job title and description are required', 400);

        const latestAnalysis = await SkillAnalysis.findOne({ user: userId }).sort({ analyzedAt: -1 });
        if (!latestAnalysis) throw new AppError('Please upload a resume first', 400);

        const matchResult = await generateStructuredContent<any>(`
You are a job matching AI. Analyze how well a candidate matches a job description.
JOB DESCRIPTION: ${jobDescription}
CANDIDATE SKILLS: ${JSON.stringify(latestAnalysis.detectedSkills, null, 2)}
Return ONLY valid JSON:
{
  "matchScore": number,
  "matchingSkills": ["string"],
  "missingSkills": ["string"],
  "recommendation": "string",
  "priority": "high|medium|low"
}`);

        return jobRepository.create({
            user: userId as any,
            jobTitle,
            company,
            jobDescription,
            matchScore: matchResult.matchScore,
            matchingSkills: matchResult.matchingSkills,
            missingSkills: matchResult.missingSkills,
            aiRecommendation: matchResult.recommendation,
            priority: matchResult.priority,
        });
    }

    async getJobMatches(userId: string, sortBy?: string, order?: string) {
        return jobRepository.findByUser(userId, sortBy as string, order as any);
    }

    async getJobMatch(userId: string, matchId: string) {
        const match = await jobRepository.findOne(userId, matchId);
        if (!match) throw new AppError('Job match not found', 404);
        return match;
    }

    async deleteJobMatch(userId: string, matchId: string) {
        const match = await jobRepository.delete(userId, matchId);
        if (!match) throw new AppError('Job match not found', 404);
    }
}

export const jobService = new JobService();
