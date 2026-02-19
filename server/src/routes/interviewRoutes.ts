import express from 'express';
import { protect } from '../middleware/authMiddleware';
import * as interviewController from '../controllers/interviewController';

const router = express.Router();

// Protect all routes
router.use(protect);

// Add interview feedback
router.post('/', interviewController.addFeedback);

// Get all feedback
router.get('/', interviewController.getAllFeedback);

// Get patterns analysis
router.get('/patterns', interviewController.getPatterns);

// Update feedback
router.patch('/:feedbackId', interviewController.updateFeedback);

// Delete feedback
router.delete('/:feedbackId', interviewController.deleteFeedback);

export default router;
