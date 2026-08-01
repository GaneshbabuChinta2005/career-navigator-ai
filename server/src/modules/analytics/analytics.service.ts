import { AppError } from '../../core/errors';
import Roadmap from '../roadmap/roadmap.schema';
import { SkillAnalysis } from '../resume/resume.schema';
import { JobMatch } from '../job/job.schema';
import { InterviewFeedback } from '../interview/interview.schema';

export class AnalyticsService {
    async getDashboardStats(userId: string) {
        const [roadmaps, latestAnalysis, jobMatches, interviews] = await Promise.all([
            Roadmap.find({ user: userId }),
            SkillAnalysis.findOne({ user: userId }).sort({ analyzedAt: -1 }),
            JobMatch.find({ user: userId }),
            InterviewFeedback.find({ user: userId }),
        ]);

        let totalTasks = 0, completedTasks = 0;
        let activeRoadmap: any = null;
        roadmaps.forEach((map: any) => {
            if (map.status === 'active') activeRoadmap = map;
            map.weeks.forEach((week: any) => {
                totalTasks += week.tasks?.length || 0;
                completedTasks += week.tasks?.filter((t: any) => t.completed).length || 0;
            });
        });
        const roadmapProgress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

        const skillStats = latestAnalysis
            ? {
                mastered: latestAnalysis.matchingSkills?.length || 0,
                inProgress: Math.floor((latestAnalysis.missingSkills?.length || 0) / 2),
                toLearn: latestAnalysis.missingSkills?.length || 0,
                readinessScore: latestAnalysis.readinessScore,
            }
            : { mastered: 0, inProgress: 0, toLearn: 0, readinessScore: 0 };

        const highPriorityJobs = jobMatches.filter(j => j.priority === 'high').length;
        const applicationStats = {
            total: jobMatches.length,
            highPriority: highPriorityJobs,
            avgMatchScore: jobMatches.length > 0
                ? Math.round(jobMatches.reduce((sum: number, j: any) => sum + j.matchScore, 0) / jobMatches.length)
                : 0,
            interviews: interviews.length,
        };

        return {
            overview: {
                readinessScore: skillStats.readinessScore,
                roadmapProgress,
                streakDays: 4, // TODO: derive from user.streakCount
            },
            roadmap: {
                active: !!activeRoadmap,
                progress: roadmapProgress,
                totalRoadmaps: roadmaps.length,
            },
            skills: skillStats,
            applications: applicationStats,
        };
    }

    getActivityHistory() {
        // TODO: replace with real aggregation from a user-activity log collection
        return [
            { date: 'Mon', hours: 2 },
            { date: 'Tue', hours: 4 },
            { date: 'Wed', hours: 1 },
            { date: 'Thu', hours: 3 },
            { date: 'Fri', hours: 5 },
            { date: 'Sat', hours: 0 },
            { date: 'Sun', hours: 2 },
        ];
    }
}

export const analyticsService = new AnalyticsService();
