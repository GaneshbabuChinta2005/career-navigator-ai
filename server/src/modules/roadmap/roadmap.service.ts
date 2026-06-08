import { generateStructuredContent } from '../../core/ai';
import { AppError } from '../../core/errors';
import { roadmapRepository } from './roadmap.repository';
import { SkillAnalysis } from '../resume/resume.schema';

export class RoadmapService {
    async generate(userId: string, targetRole: string, timeline: number = 90) {
        const latestAnalysis = await SkillAnalysis.findOne({ user: userId }).sort({ analyzedAt: -1 });
        if (!latestAnalysis) throw new AppError('Please upload a resume or update your skills first', 400);

        const aiRoadmap = await generateStructuredContent<any>(`
You are an expert learning path designer. Create a ${timeline}-day roadmap for someone to become job-ready as a ${targetRole}.
CURRENT SKILLS: ${JSON.stringify(latestAnalysis.detectedSkills, null, 2)}
SKILLS TO LEARN: ${latestAnalysis.missingSkills.join(', ')}
Return ONLY valid JSON:
{
  "title": "${targetRole} Mastery Roadmap",
  "weeks": [{
    "weekNumber": 1, "focus": "string", "goals": ["string"],
    "tasks": [{ "title": "string", "description": "string", "estimatedHours": number, "completed": false }],
    "resources": [{ "title": "string", "url": "string", "type": "video|article|course|documentation" }]
  }]
}`);

        await roadmapRepository.archiveActive(userId);

        return roadmapRepository.create({
            user: userId as any,
            targetRole,
            timeline,
            weeks: aiRoadmap.weeks,
            progress: 0,
            status: 'active',
        });
    }

    async getRoadmaps(userId: string, status?: string) {
        return roadmapRepository.findByUser(userId, status);
    }

    async getRoadmap(userId: string, roadmapId: string) {
        const roadmap = await roadmapRepository.findOne(userId, roadmapId);
        if (!roadmap) throw new AppError('Roadmap not found', 404);
        return roadmap;
    }

    async updateProgress(userId: string, roadmapId: string, weekNumber: number, taskIndex: number, completed: boolean) {
        const roadmap = await roadmapRepository.findOne(userId, roadmapId);
        if (!roadmap) throw new AppError('Roadmap not found', 404);

        const week = roadmap.weeks.find(w => w.weekNumber === weekNumber);
        if (!week) throw new AppError('Week not found', 404);
        if (!week.tasks[taskIndex]) throw new AppError('Task not found', 404);

        week.tasks[taskIndex].completed = completed;

        let totalTasks = 0, completedTasks = 0;
        roadmap.weeks.forEach(w => w.tasks.forEach(t => { totalTasks++; if (t.completed) completedTasks++; }));
        roadmap.progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        if (roadmap.progress === 100) roadmap.status = 'completed';

        return roadmapRepository.save(roadmap);
    }

    async delete(userId: string, roadmapId: string) {
        const roadmap = await roadmapRepository.delete(userId, roadmapId);
        if (!roadmap) throw new AppError('Roadmap not found', 404);
    }
}

export const roadmapService = new RoadmapService();
