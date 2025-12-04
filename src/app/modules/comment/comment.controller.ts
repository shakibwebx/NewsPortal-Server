import { Request, Response } from 'express';
import { CommentService } from './comment.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const getCommentsByNewsId = catchAsync(async (req: Request, res: Response) => {
  const { newsId, isApproved } = req.query;
  const result = await CommentService.getCommentsByNewsId(
    newsId as string,
    isApproved === 'true'
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Comments retrieved successfully',
    data: result,
    count: result.length,
  });
});

const createComment = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.createComment(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Comment submitted for approval',
    data: result,
  });
});

const approveComment = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.approveComment(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Comment approved successfully',
    data: result,
  });
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  await CommentService.deleteComment(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Comment deleted successfully',
  });
});

export const CommentController = {
  getCommentsByNewsId,
  createComment,
  approveComment,
  deleteComment,
};
