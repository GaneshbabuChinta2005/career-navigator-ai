import { Router } from 'express';
import { coverLetter, linkedin, salary } from './aiTools.controller';
import { protect } from '../../core/middleware';

const router = Router();
router.use(protect);

router.post('/cover-letter', coverLetter);
router.post('/linkedin', linkedin);
router.post('/salary', salary);

export default router;
