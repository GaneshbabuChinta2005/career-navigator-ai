import { generateStructuredContent } from '../../core/ai';
import { AppError } from '../../core/errors';
import { resumeRepository } from './resume.repository';
import { extractResumeText, deleteFile } from '../../core/utils/resumeParser';

export class ResumeService {
    async uploadAndAnalyze(
        file: Express.Multer.File,
        userId: string,
        targetRole: string
    ) {
        const extractedText = await extractResumeText(file.path);

        const resume = await resumeRepository.createResume({
            user: userId,
            filename: file.originalname,
            fileUrl: file.path,
            extractedText,
            fileSize: file.size,
            mimeType: file.mimetype,
        });

        const aiAnalysis = await generateStructuredContent<any>(`
You are an expert technical recruiter. Analyze the following resume for a ${targetRole} role.
RESUME TEXT: ${extractedText}
Return ONLY valid JSON:
{
  "detectedSkills": [{ "name": "string", "level": "beginner|intermediate|advanced|expert", "category": "string", "yearsOfExperience": number|null }],
  "experience": { "totalYears": number, "roles": ["string"] },
  "summary": "string"
}`);

        const gapAnalysis = await generateStructuredContent<any>(`
You are a senior career advisor. Analyze the skill gap for a ${targetRole} role.
CURRENT SKILLS: ${JSON.stringify(aiAnalysis.detectedSkills, null, 2)}
Return ONLY valid JSON:
{
  "missingSkills": ["string"],
  "matchingSkills": ["string"],
  "readinessScore": number,
  "recommendations": ["string"],
  "prioritySkills": [{ "skill": "string", "importance": "critical|high|medium", "timeToLearn": "string" }]
}`);

        const skillAnalysis = await resumeRepository.createSkillAnalysis({
            user: userId,
            resume: (resume as any)._id.toString(),
            targetRole,
            detectedSkills: aiAnalysis.detectedSkills,
            missingSkills: gapAnalysis.missingSkills,
            matchingSkills: gapAnalysis.matchingSkills,
            readinessScore: gapAnalysis.readinessScore,
            recommendations: gapAnalysis.recommendations,
            prioritySkills: gapAnalysis.prioritySkills,
        });

        return { resume, skillAnalysis, aiInsights: { experience: aiAnalysis.experience, summary: aiAnalysis.summary, prioritySkills: gapAnalysis.prioritySkills } };
    }

    async getResumes(userId: string) {
        return resumeRepository.findResumesByUser(userId);
    }

    async getResumeAnalysis(userId: string, resumeId: string) {
        const analysis = await resumeRepository.findAnalysisByResume(userId, resumeId);
        if (!analysis) throw new AppError('Analysis not found', 404);
        return analysis;
    }

    async getLatestAnalysis(userId: string) {
        const analysis = await resumeRepository.findLatestAnalysis(userId);
        if (!analysis) throw new AppError('No analysis found. Please upload a resume first.', 404);
        return analysis;
    }

    async updateSkills(userId: string, skills: any[], targetRole: string) {
        const gapAnalysis = await generateStructuredContent<any>(`
You are a senior career advisor. Analyze the skill gap for a ${targetRole} role.
CURRENT SKILLS: ${JSON.stringify(skills, null, 2)}
Return ONLY valid JSON:
{
  "missingSkills": ["string"],
  "matchingSkills": ["string"],
  "readinessScore": number,
  "recommendations": ["string"],
  "prioritySkills": [{ "skill": "string", "importance": "critical|high|medium", "timeToLearn": "string" }]
}`);

        return resumeRepository.createSkillAnalysis({
            user: userId,
            targetRole,
            detectedSkills: skills,
            missingSkills: gapAnalysis.missingSkills,
            matchingSkills: gapAnalysis.matchingSkills,
            readinessScore: gapAnalysis.readinessScore,
            recommendations: gapAnalysis.recommendations,
            prioritySkills: gapAnalysis.prioritySkills,
        });
    }
}

export const resumeService = new ResumeService();
