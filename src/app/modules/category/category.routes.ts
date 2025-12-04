import express from 'express';
import { CategoryController } from './category.controller';
import { authMiddleware, adminMiddleware } from '../../middlewares/auth';
import { validate } from '../../middlewares/validate';
import {
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
  getCategoryBySlugSchema
} from './category.validation';

const router = express.Router();

// Public routes - anyone can read categories
router.get('/', CategoryController.getAllCategories);
router.get('/slug/:slug', validate(getCategoryBySlugSchema), CategoryController.getCategoryBySlug);

// Protected routes - only authenticated admins can manage categories
router.post('/', authMiddleware, adminMiddleware, validate(createCategorySchema), CategoryController.createCategory);
router.put('/:id', authMiddleware, adminMiddleware, validate(updateCategorySchema), CategoryController.updateCategory);
router.delete('/:id', authMiddleware, adminMiddleware, validate(deleteCategorySchema), CategoryController.deleteCategory);

export const CategoryRoutes = router;
