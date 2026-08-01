import { Resume, SkillAnalysis, IResume, ISkillAnalysis } from './resume.schema';
import mongoose from 'mongoose';

export class ResumeRepository {
    async createResume(data: {
        user: string;
        filename: string;
        fileUrl: string;
        extractedText: string;
        fileSize: number;
        mimeType: string;
    }): Promise<IResume> {
        return Resume.create(data);
    }

    async findResumesByUser(userId: string): Promise<IResume[]> {
        return Resume.find({ user: userId })
            .sort({ uploadedAt: -1 })
            .select('-extractedText')
            .exec();
    }

    async createSkillAnalysis(data: {
        user: string;
        resume?: string;
        targetRole: string;
        detectedSkills: any[];
        missingSkills: string[];
        matchingSkills: string[];
        readinessScore: number;
        recommendations: string[];
        prioritySkills?: any[];
    }): Promise<ISkillAnalysis> {
        return SkillAnalysis.create(data);
    }

    async findLatestAnalysis(userId: string): Promise<ISkillAnalysis | null> {
        return SkillAnalysis.findOne({ user: userId })
            .sort({ analyzedAt: -1 })
            .populate('resume', 'filename uploadedAt')
            .exec();
    }

    async findAnalysisByResume(userId: string, resumeId: string): Promise<ISkillAnalysis | null> {
        return SkillAnalysis.findOne({ user: userId, resume: resumeId })
            .populate('resume', 'filename uploadedAt')
            .exec();
    }
}

export const resumeRepository = new ResumeRepository();
