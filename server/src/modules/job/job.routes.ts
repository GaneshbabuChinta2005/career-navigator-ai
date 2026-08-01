import { Router } from 'express';
import { matchJob, getJobMatches, getJobMatch, deleteJobMatch } from './job.controller';
import { protect } from '../../core/middleware';

const router = Router();
router.use(protect);

router.post('/match', matchJob);
router.get('/', getJobMatches);
router.get('/:matchId', getJobMatch);
router.delete('/:matchId', deleteJobMatch);

export default router;
