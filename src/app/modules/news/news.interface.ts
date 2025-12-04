import { Document } from 'mongoose';

export interface INews extends Document {
  title: string;
  slug: string;
  subtitle?: string;
  content: string;
  summary: string;
  author: string;
  category: any;
  tags: string[];
  image: string;
  isFeatured: boolean;
  isBreaking: boolean;
  isVideo: boolean;
  videoUrl?: string;
  views: number;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface INewsQuery {
  category?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
  sort?: string;
}
