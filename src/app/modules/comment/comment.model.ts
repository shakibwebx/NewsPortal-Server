import mongoose, { Schema } from 'mongoose';
import { IComment } from './comment.interface';

const CommentSchema: Schema = new Schema(
  {
    newsId: {
      type: Schema.Types.ObjectId,
      ref: 'News',
      required: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    userEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

CommentSchema.index({ newsId: 1, createdAt: -1 });

export const Comment = mongoose.model<IComment>('Comment', CommentSchema);
