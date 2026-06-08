import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import * as aiService from '../services/aiService';

export const coverLetter = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userInfo, jobInfo, tone, length } = req.body;

    if (!userInfo || !jobInfo) {
        return next(new AppError('Please provide userInfo and jobInfo', 400));
    }

    const data = await aiService.generateCoverLetter({
        userInfo,
        jobInfo,
        tone: tone || 'professional',
        length: length || 'medium'
    });

    res.status(200).json({
        status: 'success',
        data
    });
});

export const linkedin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, currentTitle, experience, skills, targetRole } = req.body;

    if (!name || !targetRole) {
        return next(new AppError('Please provide name and targetRole', 400));
    }

    const data = await aiService.optimizeLinkedInProfile({
        name,
        currentTitle: currentTitle || '',
        experience: experience || '',
        skills: skills || '',
        targetRole
    });

    res.status(200).json({
        status: 'success',
        data
    });
});

export const salary = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { role, experienceLevel, location, currentOffer, targetSalary } = req.body;

    if (!role || !experienceLevel || !location) {
        return next(new AppError('Please provide role, experienceLevel, and location', 400));
    }

    const data = await aiService.negotiateSalary({
        role,
        experienceLevel,
        location,
        currentOffer,
        targetSalary
    });

    res.status(200).json({
        status: 'success',
        data
    });
});
