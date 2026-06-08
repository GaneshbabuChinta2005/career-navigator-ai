import { Request, Response } from 'express';
import { catchAsync, AppError } from '../../core/errors';
import { resumeService } from './resume.service';

export const uploadResume = catchAsync(async (req: Request, res: Response) => {
    if (!req.file) throw new AppError('No file uploaded', 400);
    const { targetRole } = req.body;
    if (!targetRole) throw new AppError('Target role is required', 400);

    const result = await resumeService.uploadAndAnalyze(req.file as any, req.user._id.toString(), targetRole);
    res.status(201).json({ status: 'success', data: result });
});

export const getResumes = catchAsync(async (req: Request, res: Response) => {
    const resumes = await resumeService.getResumes(req.user._id.toString());
    res.status(200).json({ status: 'success', results: resumes.length, data: { resumes } });
});

export const getResumeAnalysis = catchAsync(async (req: Request, res: Response) => {
    const analysis = await resumeService.getResumeAnalysis(req.user._id.toString(), req.params.resumeId as string);
    res.status(200).json({ status: 'success', data: { analysis } });
});

export const getLatestAnalysis = catchAsync(async (req: Request, res: Response) => {
    const analysis = await resumeService.getLatestAnalysis(req.user._id.toString());
    res.status(200).json({ status: 'success', data: { analysis } });
});

export const updateSkills = catchAsync(async (req: Request, res: Response) => {
    const { skills, targetRole } = req.body;
    if (!skills || !Array.isArray(skills)) throw new AppError('Skills array is required', 400);
    const analysis = await resumeService.updateSkills(req.user._id.toString(), skills, targetRole);
    res.status(200).json({ status: 'success', data: { analysis } });
});
