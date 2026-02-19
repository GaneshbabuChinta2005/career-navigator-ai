import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import InterviewFeedback from '../models/InterviewFeedback';
import { analyzeInterviewPatterns } from '../services/aiService';

/**
 * Add interview feedback
 */
export const addFeedback = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const {
        company,
        position,
        date,
        questions,
        performance,
        weaknesses,
        strengths,
        notes
    } = req.body;

    if (!company || !position || !date || !performance) {
        throw new AppError('Company, position, date, and performance are required', 400);
    }

    const feedback = await InterviewFeedback.create({
        user: userId,
        company,
        position,
        date,
        questions: questions || [],
        performance,
        weaknesses: weaknesses || [],
        strengths: strengths || [],
        notes: notes || ''
    });

    res.status(201).json({
        status: 'success',
        data: { feedback }
    });
});

/**
 * Get all interview feedback
 */
export const getAllFeedback = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;

    const feedbacks = await InterviewFeedback.find({ user: userId })
        .sort({ date: -1 });

    res.status(200).json({
        status: 'success',
        results: feedbacks.length,
        data: { feedbacks }
    });
});

/**
 * Get interview patterns analysis
 */
export const getPatterns = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;

    const feedbacks = await InterviewFeedback.find({ user: userId })
        .sort({ date: -1 })
        .limit(10); // Analyze last 10 interviews

    if (feedbacks.length === 0) {
        throw new AppError('No interview feedback found', 404);
    }

    // Perform AI analysis
    const patterns = await analyzeInterviewPatterns(feedbacks);

    res.status(200).json({
        status: 'success',
        data: { patterns }
    });
});

/**
 * Update interview feedback
 */
export const updateFeedback = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { feedbackId } = req.params;

    const feedback = await InterviewFeedback.findOneAndUpdate(
        { _id: feedbackId, user: userId },
        req.body,
        { new: true, runValidators: true }
    );

    if (!feedback) {
        throw new AppError('Feedback not found', 404);
    }

    res.status(200).json({
        status: 'success',
        data: { feedback }
    });
});

/**
 * Delete interview feedback
 */
export const deleteFeedback = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { feedbackId } = req.params;

    const feedback = await InterviewFeedback.findOneAndDelete({
        _id: feedbackId,
        user: userId
    });

    if (!feedback) {
        throw new AppError('Feedback not found', 404);
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});
