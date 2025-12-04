import { Document } from 'mongoose';

export interface IComment extends Document {
  newsId: string;
  userName: string;
  userEmail: string;
  content: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}
