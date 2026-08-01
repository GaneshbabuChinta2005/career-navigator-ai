import { Request, Response } from 'express';
import { catchAsync } from '../../core/errors';
import { analyticsService } from './analytics.service';

export const getDashboardStats = catchAsync(async (req: Request, res: Response) => {
    const stats = await analyticsService.getDashboardStats(req.user._id.toString());
    res.status(200).json({ status: 'success', data: stats });
});

export const getActivityHistory = catchAsync(async (_req: Request, res: Response) => {
    const history = analyticsService.getActivityHistory();
    res.status(200).json({ status: 'success', data: { history } });
});
