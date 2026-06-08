import { Router } from 'express';
import { uploadResume, getResumes, getResumeAnalysis, getLatestAnalysis, updateSkills } from './resume.controller';
import { protect, upload } from '../../core/middleware';

const router = Router();

router.use(protect);

router.post('/upload', upload.single('resume'), uploadResume);
router.get('/', getResumes);
router.get('/analysis/latest', getLatestAnalysis);
router.get('/analysis/:resumeId', getResumeAnalysis);
router.post('/skills', updateSkills);

export default router;
