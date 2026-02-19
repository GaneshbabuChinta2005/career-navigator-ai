import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import Roadmap from '../models/Roadmap';
import SkillAnalysis from '../models/SkillAnalysis';
import { generateLearningRoadmap } from '../services/aiService';

/**
 * Generate new roadmap
 */
export const generate = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { targetRole, timeline = 90 } = req.body;

    if (!targetRole) {
        throw new AppError('Target role is required', 400);
    }

    // Get latest skill analysis
    const latestAnalysis = await SkillAnalysis.findOne({ user: userId })
        .sort({ analyzedAt: -1 });

    if (!latestAnalysis) {
        throw new AppError('Please upload a resume or update your skills first', 400);
    }

    // Generate roadmap using AI
    const aiRoadmap = await generateLearningRoadmap(
        targetRole,
        latestAnalysis.detectedSkills,
        latestAnalysis.missingSkills,
        timeline
    );

    // Archive existing active roadmaps
    await Roadmap.updateMany(
        { user: userId, status: 'active' },
        { status: 'archived' }
    );

    // Create new roadmap
    const roadmap = await Roadmap.create({
        user: userId,
        targetRole,
        timeline,
        weeks: aiRoadmap.weeks,
        progress: 0,
        status: 'active'
    });

    res.status(201).json({
        status: 'success',
        data: { roadmap }
    });
});

/**
 * Get user roadmaps
 */
export const getRoadmaps = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { status = 'active' } = req.query;

    const roadmaps = await Roadmap.find({
        user: userId,
        ...(status && { status })
    }).sort({ createdAt: -1 });

    res.status(200).json({
        status: 'success',
        results: roadmaps.length,
        data: { roadmaps }
    });
});

/**
 * Get specific roadmap
 */
export const getRoadmap = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { roadmapId } = req.params;

    const roadmap = await Roadmap.findOne({
        _id: roadmapId,
        user: userId
    });

    if (!roadmap) {
        throw new AppError('Roadmap not found', 404);
    }

    res.status(200).json({
        status: 'success',
        data: { roadmap }
    });
});

/**
 * Update roadmap progress
 */
export const updateProgress = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { roadmapId } = req.params;
    const { weekNumber, taskIndex, completed } = req.body;

    const roadmap = await Roadmap.findOne({
        _id: roadmapId,
        user: userId
    });

    if (!roadmap) {
        throw new AppError('Roadmap not found', 404);
    }

    // Update task completion
    const week = roadmap.weeks.find((w: any) => w.weekNumber === weekNumber);
    if (!week) {
        throw new AppError('Week not found', 404);
    }

    if (!week.tasks[taskIndex]) {
        throw new AppError('Task not found', 404);
    }

    week.tasks[taskIndex].completed = completed;

    // Recalculate overall progress
    let totalTasks = 0;
    let completedTasks = 0;
    roadmap.weeks.forEach((w: any) => {
        w.tasks.forEach((t: any) => {
            totalTasks++;
            if (t.completed) completedTasks++;
        });
    });

    roadmap.progress = Math.round((completedTasks / totalTasks) * 100);

    // Check if roadmap is completed
    if (roadmap.progress === 100) {
        roadmap.status = 'completed';
    }

    await roadmap.save();

    res.status(200).json({
        status: 'success',
        data: { roadmap }
    });
});

/**
 * Delete roadmap
 */
export const deleteRoadmap = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { roadmapId } = req.params;

    const roadmap = await Roadmap.findOneAndDelete({
        _id: roadmapId,
        user: userId
    });

    if (!roadmap) {
        throw new AppError('Roadmap not found', 404);
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});
