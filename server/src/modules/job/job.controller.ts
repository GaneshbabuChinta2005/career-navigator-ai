import { Request, Response } from 'express';
import { catchAsync } from '../../core/errors';
import { jobService } from './job.service';

export const matchJob = catchAsync(async (req: Request, res: Response) => {
    const { jobTitle, company, jobDescription } = req.body;
    const jobMatch = await jobService.matchJob(req.user._id.toString(), jobTitle, company, jobDescription);
    res.status(201).json({ status: 'success', data: { jobMatch } });
});

export const getJobMatches = catchAsync(async (req: Request, res: Response) => {
    const matches = await jobService.getJobMatches(req.user._id.toString(), req.query.sortBy as string, req.query.order as string);
    res.status(200).json({ status: 'success', results: matches.length, data: { matches } });
});

export const getJobMatch = catchAsync(async (req: Request, res: Response) => {
    const match = await jobService.getJobMatch(req.user._id.toString(), req.params.matchId as string);
    res.status(200).json({ status: 'success', data: { match } });
});

export const deleteJobMatch = catchAsync(async (req: Request, res: Response) => {
    await jobService.deleteJobMatch(req.user._id.toString(), req.params.matchId as string);
    res.status(204).json({ status: 'success', data: null });
});
