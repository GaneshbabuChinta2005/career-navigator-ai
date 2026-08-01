import { Router } from 'express';
import { addFeedback, getAllFeedback, getPatterns, updateFeedback, deleteFeedback } from './interview.controller';
import { protect } from '../../core/middleware';

const router = Router();
router.use(protect);

router.post('/', addFeedback);
router.get('/', getAllFeedback);
router.get('/patterns', getPatterns);
router.patch('/:feedbackId', updateFeedback);
router.delete('/:feedbackId', deleteFeedback);

export default router;
