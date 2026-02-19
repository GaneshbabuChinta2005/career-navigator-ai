import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import Resume from '../models/Resume';
import SkillAnalysis from '../models/SkillAnalysis';
import { extractResumeText, deleteFile } from '../utils/resumeParser';
import { analyzeResumeSkills, performSkillGapAnalysis } from '../services/aiService';

/**
 * Upload and analyze resume
 */
export const uploadResume = catchAsync(async (req: Request, res: Response) => {
    if (!req.file) {
        throw new AppError('No file uploaded', 400);
    }

    const userId = (req as any).user.id;
    const { targetRole } = req.body;

    if (!targetRole) {
        await deleteFile(req.file.path);
        throw new AppError('Target role is required', 400);
    }

    // Extract text from resume
    const extractedText = await extractResumeText(req.file.path);

    // Save resume to database
    const resume = await Resume.create({
        user: userId,
        filename: req.file.originalname,
        fileUrl: req.file.path,
        extractedText,
        fileSize: req.file.size,
        mimeType: req.file.mimetype
    });

    // Analyze skills using AI
    const aiAnalysis = await analyzeResumeSkills(extractedText, targetRole);

    // Perform skill gap analysis
    const gapAnalysis = await performSkillGapAnalysis(
        aiAnalysis.detectedSkills,
        targetRole
    );

    // Save skill analysis
    const skillAnalysis = await SkillAnalysis.create({
        user: userId,
        resume: resume._id,
        targetRole,
        detectedSkills: aiAnalysis.detectedSkills,
        missingSkills: gapAnalysis.missingSkills,
        matchingSkills: gapAnalysis.matchingSkills,
        readinessScore: gapAnalysis.readinessScore,
        recommendations: gapAnalysis.recommendations
    });

    // Clean up uploaded file (optional - keep or delete based on requirements)
    // await deleteFile(req.file.path);

    res.status(201).json({
        status: 'success',
        data: {
            resume: {
                id: resume._id,
                filename: resume.filename,
                uploadedAt: resume.uploadedAt
            },
            analysis: {
                id: skillAnalysis._id,
                detectedSkills: skillAnalysis.detectedSkills,
                missingSkills: skillAnalysis.missingSkills,
                readinessScore: skillAnalysis.readinessScore,
                recommendations: skillAnalysis.recommendations
            },
            aiInsights: {
                experience: aiAnalysis.experience,
                summary: aiAnalysis.summary,
                prioritySkills: gapAnalysis.prioritySkills
            }
        }
    });
});

/**
 * Get user's resume history
 */
export const getResumes = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;

    const resumes = await Resume.find({ user: userId })
        .sort({ uploadedAt: -1 })
        .select('-extractedText'); // Don't send full text

    res.status(200).json({
        status: 'success',
        results: resumes.length,
        data: { resumes }
    });
});

/**
 * Get specific resume analysis
 */
export const getResumeAnalysis = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { resumeId } = req.params;

    const analysis = await SkillAnalysis.findOne({
        user: userId,
        resume: resumeId
    }).populate('resume', 'filename uploadedAt');

    if (!analysis) {
        throw new AppError('Analysis not found', 404);
    }

    res.status(200).json({
        status: 'success',
        data: { analysis }
    });
});

/**
 * Get latest skill analysis
 */
export const getLatestAnalysis = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;

    const analysis = await SkillAnalysis.findOne({ user: userId })
        .sort({ analyzedAt: -1 })
        .populate('resume', 'filename uploadedAt');

    if (!analysis) {
        throw new AppError('No analysis found', 404);
    }

    res.status(200).json({
        status: 'success',
        data: { analysis }
    });
});

/**
 * Update user skills manually
 */
export const updateSkills = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { skills, targetRole } = req.body;

    if (!skills || !Array.isArray(skills)) {
        throw new AppError('Skills array is required', 400);
    }

    // Perform gap analysis with updated skills
    const gapAnalysis = await performSkillGapAnalysis(skills, targetRole);

    // Create new analysis entry
    const analysis = await SkillAnalysis.create({
        user: userId,
        targetRole,
        detectedSkills: skills,
        missingSkills: gapAnalysis.missingSkills,
        matchingSkills: gapAnalysis.matchingSkills,
        readinessScore: gapAnalysis.readinessScore,
        recommendations: gapAnalysis.recommendations
    });

    res.status(200).json({
        status: 'success',
        data: { analysis }
    });
});
