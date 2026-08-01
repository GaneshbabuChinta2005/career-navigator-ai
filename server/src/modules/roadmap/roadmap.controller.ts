import { Request, Response } from 'express';
import { catchAsync } from '../../core/errors';
import { roadmapService } from './roadmap.service';

export const generate = catchAsync(async (req: Request, res: Response) => {
    const roadmap = await roadmapService.generate(req.user._id.toString(), req.body.targetRole, req.body.timeline);
    res.status(201).json({ status: 'success', data: { roadmap } });
});

export const getRoadmaps = catchAsync(async (req: Request, res: Response) => {
    const roadmaps = await roadmapService.getRoadmaps(req.user._id.toString(), req.query.status as string);
    res.status(200).json({ status: 'success', results: roadmaps.length, data: { roadmaps } });
});

export const getRoadmap = catchAsync(async (req: Request, res: Response) => {
    const roadmap = await roadmapService.getRoadmap(req.user._id.toString(), req.params.roadmapId as string);
    res.status(200).json({ status: 'success', data: { roadmap } });
});

export const updateProgress = catchAsync(async (req: Request, res: Response) => {
    const { weekNumber, taskIndex, completed } = req.body;
    const roadmap = await roadmapService.updateProgress(req.user._id.toString(), req.params.roadmapId as string, weekNumber, taskIndex, completed);
    res.status(200).json({ status: 'success', data: { roadmap } });
});

export const deleteRoadmap = catchAsync(async (req: Request, res: Response) => {
    await roadmapService.delete(req.user._id.toString(), req.params.roadmapId as string);
    res.status(204).json({ status: 'success', data: null });
});
