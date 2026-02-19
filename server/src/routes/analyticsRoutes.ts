import express from 'express';
import { getDashboardStats, getActivityHistory } from '../controllers/analyticsController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.use(protect);

router.get('/stats', getDashboardStats);
router.get('/activity', getActivityHistory);

export default router;
