import { Router } from 'express';
import { getDashboardStats, getActivityHistory } from './analytics.controller';
import { protect } from '../../core/middleware';

const router = Router();
router.use(protect);

router.get('/dashboard', getDashboardStats);
router.get('/activity', getActivityHistory);

export default router;
