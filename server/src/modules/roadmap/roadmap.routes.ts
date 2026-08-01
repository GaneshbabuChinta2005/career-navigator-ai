import { Router } from 'express';
import { generate, getRoadmaps, getRoadmap, updateProgress, deleteRoadmap } from './roadmap.controller';
import { protect } from '../../core/middleware';

const router = Router();
router.use(protect);

router.post('/generate', generate);
router.get('/', getRoadmaps);
router.get('/:roadmapId', getRoadmap);
router.patch('/:roadmapId/progress', updateProgress);
router.delete('/:roadmapId', deleteRoadmap);

export default router;
