import express from 'express';
import { protect } from '../middleware/authMiddleware';
import * as jobController from '../controllers/jobController';

const router = express.Router();

// Protect all routes
router.use(protect);

// Match job description
router.post('/match', jobController.matchJob);

// Get all job matches
router.get('/matches', jobController.getJobMatches);

// Get specific job match
router.get('/matches/:matchId', jobController.getJobMatch);

// Delete job match
router.delete('/matches/:matchId', jobController.deleteJobMatch);

export default router;
