import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import JobMatch from '../models/JobMatch';
import SkillAnalysis from '../models/SkillAnalysis';
import { matchJobDescription } from '../services/aiService';

/**
 * Match job description with user skills
 */
export const matchJob = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { jobTitle, company, jobDescription } = req.body;

    if (!jobTitle || !jobDescription) {
        throw new AppError('Job title and description are required', 400);
    }

    // Get user's latest skills
    const latestAnalysis = await SkillAnalysis.findOne({ user: userId })
        .sort({ analyzedAt: -1 });

    if (!latestAnalysis) {
        throw new AppError('Please upload a resume first', 400);
    }

    // Perform AI matching
    const matchResult = await matchJobDescription(
        jobDescription,
        latestAnalysis.detectedSkills
    );

    // Save match result
    const jobMatch = await JobMatch.create({
        user: userId,
        jobTitle,
        company,
        jobDescription,
        matchScore: matchResult.matchScore,
        matchingSkills: matchResult.matchingSkills,
        missingSkills: matchResult.missingSkills,
        aiRecommendation: matchResult.recommendation,
        priority: matchResult.priority
    });

    res.status(201).json({
        status: 'success',
        data: { jobMatch }
    });
});

/**
 * Get user's job matches history
 */
export const getJobMatches = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { sortBy = 'matchedAt', order = 'desc' } = req.query;

    const matches = await JobMatch.find({ user: userId })
        .sort({ [sortBy as string]: order === 'asc' ? 1 : -1 })
        .limit(50);

    res.status(200).json({
        status: 'success',
        results: matches.length,
        data: { matches }
    });
});

/**
 * Get specific job match
 */
export const getJobMatch = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { matchId } = req.params;

    const match = await JobMatch.findOne({
        _id: matchId,
        user: userId
    });

    if (!match) {
        throw new AppError('Job match not found', 404);
    }

    res.status(200).json({
        status: 'success',
        data: { match }
    });
});

/**
 * Delete job match
 */
export const deleteJobMatch = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { matchId } = req.params;

    const match = await JobMatch.findOneAndDelete({
        _id: matchId,
        user: userId
    });

    if (!match) {
        throw new AppError('Job match not found', 404);
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});
