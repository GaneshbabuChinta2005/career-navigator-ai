import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { upload } from '../middleware/upload';
import * as resumeController from '../controllers/resumeController';

const router = express.Router();

// Protect all routes
router.use(protect);

// Resume upload and analysis
router.post('/upload', upload.single('resume'), resumeController.uploadResume);

// Get user's resumes
router.get('/', resumeController.getResumes);

// Get specific resume analysis
router.get('/analysis/:resumeId', resumeController.getResumeAnalysis);

// Get latest analysis
router.get('/analysis/latest', resumeController.getLatestAnalysis);

// Update skills manually
router.post('/skills/update', resumeController.updateSkills);

export default router;
