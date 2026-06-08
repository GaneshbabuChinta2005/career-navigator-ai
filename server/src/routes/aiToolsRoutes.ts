import express from 'express';
import { protect } from '../middleware/authMiddleware';
import * as aiToolsController from '../controllers/aiToolsController';

const router = express.Router();

// Protect all routes
router.use(protect);

router.post('/cover-letter', aiToolsController.coverLetter);
router.post('/linkedin', aiToolsController.linkedin);
router.post('/salary', aiToolsController.salary);

export default router;
