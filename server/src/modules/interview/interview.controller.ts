import { Request, Response } from 'express';
import { catchAsync } from '../../core/errors';
import { interviewService } from './interview.service';

export const addFeedback = catchAsync(async (req: Request, res: Response) => {
    const feedback = await interviewService.addFeedback(req.user._id.toString(), req.body);
    res.status(201).json({ status: 'success', data: { feedback } });
});

export const getAllFeedback = catchAsync(async (req: Request, res: Response) => {
    const feedbacks = await interviewService.getAllFeedback(req.user._id.toString());
    res.status(200).json({ status: 'success', results: feedbacks.length, data: { feedbacks } });
});

export const getPatterns = catchAsync(async (req: Request, res: Response) => {
    const patterns = await interviewService.getPatterns(req.user._id.toString());
    res.status(200).json({ status: 'success', data: { patterns } });
});

export const updateFeedback = catchAsync(async (req: Request, res: Response) => {
    const feedback = await interviewService.updateFeedback(req.user._id.toString(), req.params.feedbackId as string, req.body);
    res.status(200).json({ status: 'success', data: { feedback } });
});

export const deleteFeedback = catchAsync(async (req: Request, res: Response) => {
    await interviewService.deleteFeedback(req.user._id.toString(), req.params.feedbackId as string);
    res.status(204).json({ status: 'success', data: null });
});
