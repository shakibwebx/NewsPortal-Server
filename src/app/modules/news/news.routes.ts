import express from 'express';
import { NewsController } from './news.controller';
import { authMiddleware, adminMiddleware } from '../../middlewares/auth';
import { validate } from '../../middlewares/validate';
import {
  createNewsSchema,
  updateNewsSchema,
  getNewsByIdSchema,
  deleteNewsSchema
} from './news.validation';

const router = express.Router();

// Public routes - anyone can read
router.get('/', NewsController.getAllNews);
router.get('/search', NewsController.searchNews);
router.get('/featured', NewsController.getFeaturedNews);
router.get('/popular', NewsController.getPopularNews);
router.get('/category/:category', NewsController.getNewsByCategory);
router.get('/:id', validate(getNewsByIdSchema), NewsController.getNewsById);
router.patch('/:id/views', validate(getNewsByIdSchema), NewsController.incrementViews);

// Protected routes - require authentication and admin/editor role
router.post('/', authMiddleware, validate(createNewsSchema), NewsController.createNews);
router.put('/:id', authMiddleware, validate(updateNewsSchema), NewsController.updateNews);
router.delete('/:id', authMiddleware, adminMiddleware, validate(deleteNewsSchema), NewsController.deleteNews);

export const NewsRoutes = router;
