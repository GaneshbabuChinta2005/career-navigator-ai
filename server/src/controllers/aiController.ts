import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import * as aiService from '../services/geminiService';
import Roadmap from '../models/Roadmap';

export const analyzeResume = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { resumeText } = req.body;

    if (!resumeText) {
        return next(new AppError('Please provide resume text', 400));
    }

    const analysis = await aiService.parseResume(resumeText);

    res.status(200).json({
        status: 'success',
        data: analysis
    });
});

export const createRoadmap = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { currentSkills, targetRole } = req.body;
    const userId = req.user._id;

    const roadmapData = await aiService.generateRoadmapAI(currentSkills, targetRole);

    const newRoadmap = await Roadmap.create({
        user: userId,
        targetRole,
        weeks: roadmapData.weeks
    });

    res.status(201).json({
        status: 'success',
        data: {
            roadmap: newRoadmap
        }
    });
});

export const getMyRoadmaps = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const roadmaps = await Roadmap.find({ user: req.user._id });

    res.status(200).json({
        status: 'success',
        results: roadmaps.length,
        data: {
            roadmaps
        }
    });
});
