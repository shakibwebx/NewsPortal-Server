import { z } from 'zod';

export const createCommentSchema = z.object({
  body: z.object({
    newsId: z.string()
      .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid news ID' }),

    userName: z.string()
      .min(2, { message: 'Name must be at least 2 characters' })
      .max(50, { message: 'Name must not exceed 50 characters' })
      .regex(/^[a-zA-Z\s\u0980-\u09FF]+$/, { message: 'Name can only contain letters' }),

    userEmail: z.string()
      .email({ message: 'Invalid email address' }),

    content: z.string()
      .min(5, { message: 'Comment must be at least 5 characters' })
      .max(1000, { message: 'Comment must not exceed 1000 characters' }),
  }),
});

export const approveCommentSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid comment ID'),
  }),
});

export const deleteCommentSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid comment ID'),
  }),
});

export const getCommentsByNewsIdSchema = z.object({
  query: z.object({
    newsId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid news ID').optional(),
    isApproved: z.enum(['true', 'false']).optional(),
  }),
});
