import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import Roadmap from '../models/Roadmap';
import User from '../models/User';

export const getDashboardStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user._id;

    // 1. Get Roadmap Progress
    const roadmaps = await Roadmap.find({ user: userId });

    let totalGoals = 0;
    let completedGoals = 0;
    let activeRoadmap = null;

    roadmaps.forEach(map => {
        if (map.status === 'active') activeRoadmap = map;
        map.weeks.forEach(week => {
            totalGoals += week.tasks?.length || 0;
            const completed = week.tasks?.filter((t: any) => t.completed).length || 0;
            completedGoals += completed;
        });
    });

    const roadmapProgress = totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100);

    // 2. Mock Skill Stats (since we haven't implemented Skill tracking fully in DB yet)
    // In a real app, we'd query a Skills collection
    const skillStats = {
        mastered: 5,
        inProgress: 3,
        toLearn: 12
    };

    // 3. Application Stats (Mock for now)
    const applicationStats = {
        applied: 12,
        interviews: 3,
        offers: 0
    };

    res.status(200).json({
        status: 'success',
        data: {
            overview: {
                readinessScore: roadmapProgress + 20, // Mock formula
                totalStudyHours: 45, // Mock
                streakDays: 4 // Mock
            },
            roadmap: {
                active: !!activeRoadmap,
                progress: roadmapProgress,
                totalRoadmaps: roadmaps.length
            },
            skills: skillStats,
            applications: applicationStats
        }
    });
});

export const getActivityHistory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Mock activity data for the chart
    const history = [
        { date: 'Mon', hours: 2 },
        { date: 'Tue', hours: 4 },
        { date: 'Wed', hours: 1 },
        { date: 'Thu', hours: 3 },
        { date: 'Fri', hours: 5 },
        { date: 'Sat', hours: 0 },
        { date: 'Sun', hours: 2 },
    ];

    res.status(200).json({
        status: 'success',
        data: {
            history
        }
    });
});
