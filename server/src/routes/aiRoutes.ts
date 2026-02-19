import express from 'express';
import * as roadmapController from '../controllers/roadmapController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.use(protect);

// Generate new roadmap
router.post('/generate', roadmapController.generate);
router.get('/', roadmapController.getRoadmaps);
router.get('/:roadmapId', roadmapController.getRoadmap);
router.patch('/:roadmapId/progress', roadmapController.updateProgress);
router.delete('/:roadmapId', roadmapController.deleteRoadmap);

export default router;
