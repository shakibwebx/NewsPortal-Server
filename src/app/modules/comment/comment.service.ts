import { Comment } from './comment.model';
import { IComment } from './comment.interface';
import AppError from '../../utils/AppError';

const getCommentsByNewsId = async (newsId?: string, isApproved?: boolean) => {
  const filter: any = {};
  if (newsId) filter.newsId = newsId;
  if (isApproved !== undefined) filter.isApproved = isApproved;

  const comments = await Comment.find(filter).sort({ createdAt: -1 });
  return comments;
};

const createComment = async (payload: Partial<IComment>) => {
  const comment = await Comment.create(payload);
  return comment;
};

const approveComment = async (id: string) => {
  const comment = await Comment.findByIdAndUpdate(
    id,
    { isApproved: true },
    { new: true }
  );

  if (!comment) {
    throw new AppError(404, 'Comment not found');
  }

  return comment;
};

const deleteComment = async (id: string) => {
  const comment = await Comment.findByIdAndDelete(id);

  if (!comment) {
    throw new AppError(404, 'Comment not found');
  }

  return comment;
};

export const CommentService = {
  getCommentsByNewsId,
  createComment,
  approveComment,
  deleteComment,
};
