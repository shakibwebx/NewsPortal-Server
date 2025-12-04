import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { NewsRoutes } from './app/modules/news/news.routes';
import { CategoryRoutes } from './app/modules/category/category.routes';
import { CommentRoutes } from './app/modules/comment/comment.routes';
import { AuthRoutes } from './app/modules/auth/auth.routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import config from './config';

const app: Application = express();

// CORS configuration - restrict to specific origins in production
const corsOptions = {
  origin: (config as any).cors_origin || ['http://localhost:3000', 'https://news-portal-client-taupe.vercel.app'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Rate limiting - prevent abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 auth requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // Limit payload size
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'News Portal Server is running',
    timestamp: new Date().toISOString()
  });
});

// Application routes with rate limiting
app.use('/api/auth', authLimiter, AuthRoutes); // Stricter limit for auth
app.use('/api/news', apiLimiter, NewsRoutes);
app.use('/api/categories', apiLimiter, CategoryRoutes);
app.use('/api/comments', apiLimiter, CommentRoutes);

// Global error handler
app.use(globalErrorHandler);

// Not found handler
app.use(notFound);

export default app;
