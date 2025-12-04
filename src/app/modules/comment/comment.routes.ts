import express from 'express';
import { CommentController } from './comment.controller';
import { authMiddleware, adminMiddleware } from '../../middlewares/auth';
import { validate } from '../../middlewares/validate';
import {
  createCommentSchema,
  approveCommentSchema,
  deleteCommentSchema,
  getCommentsByNewsIdSchema
} from './comment.validation';

const router = express.Router();

// Public routes - anyone can read approved comments and post comments
router.get('/', validate(getCommentsByNewsIdSchema), CommentController.getCommentsByNewsId);
router.post('/', validate(createCommentSchema), CommentController.createComment);

// Protected routes - only authenticated users with admin role can approve/delete
router.patch('/:id/approve', authMiddleware, adminMiddleware, validate(approveCommentSchema), CommentController.approveComment);
router.delete('/:id', authMiddleware, adminMiddleware, validate(deleteCommentSchema), CommentController.deleteComment);

export const CommentRoutes = router;
