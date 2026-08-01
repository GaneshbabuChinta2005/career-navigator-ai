import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

// Core
import { globalErrorHandler, notFoundHandler } from './core/errors';

// Module Routes
import authRoutes from './modules/auth/auth.routes';
import resumeRoutes from './modules/resume/resume.routes';
import roadmapRoutes from './modules/roadmap/roadmap.routes';
import analyticsRoutes from './modules/analytics/analytics.routes';
import jobRoutes from './modules/job/job.routes';
import interviewRoutes from './modules/interview/interview.routes';
import aiToolsRoutes from './modules/ai-tools/aiTools.routes';

const app = express();

// ── Security ──────────────────────────────────────────────────────────────────
app.use(helmet());

// ── Rate Limiting ─────────────────────────────────────────────────────────────
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { status: 'error', message: 'Too many requests from this IP, please try again later.' },
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { status: 'error', message: 'Too many auth attempts. Please try again later.' },
});

app.use('/api/', globalLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/signup', authLimiter);

// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:8081',
    credentials: true,
}));

// ── Body Parser ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Logging ───────────────────────────────────────────────────────────────────
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// ── Health Check ──────────────────────────────────────────────────────────────
app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'Career Navigator AI API is healthy',
        timestamp: new Date().toISOString(),
        version: '3.0.0',
        architecture: 'layered-modules',
    });
});

app.get('/', (_req: Request, res: Response) => {
    res.json({
        message: 'Career Navigator AI API v3',
        architecture: 'src/modules/{auth,resume,roadmap,job,interview,analytics,ai-tools}',
        endpoints: {
            auth: '/api/auth',
            resume: '/api/resume',
            roadmap: '/api/roadmap',
            analytics: '/api/analytics',
            job: '/api/job',
            interview: '/api/interview',
            aiTools: '/api/ai-tools',
        },
    });
});

// ── Module Routes ─────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/ai-tools', aiToolsRoutes);

// ── Error Handling ────────────────────────────────────────────────────────────
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
