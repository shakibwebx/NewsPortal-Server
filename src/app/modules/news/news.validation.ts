import { z } from 'zod';

export const createNewsSchema = z.object({
  body: z.object({
    title: z.string()
      .min(5, { message: 'Title must be at least 5 characters' })
      .max(200, { message: 'Title must not exceed 200 characters' }),

    subtitle: z.string().optional(),

    content: z.string()
      .min(50, { message: 'Content must be at least 50 characters' }),

    summary: z.string()
      .min(20, { message: 'Summary must be at least 20 characters' })
      .max(500, { message: 'Summary must not exceed 500 characters' }),

    author: z.string()
      .min(2, { message: 'Author name must be at least 2 characters' }),

    category: z.string()
      .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid category ID' }),

    tags: z.array(z.string()).optional(),

    image: z.string()
      .url({ message: 'Invalid image URL' }),

    isFeatured: z.boolean().optional(),

    isBreaking: z.boolean().optional(),

    isVideo: z.boolean().optional(),

    videoUrl: z.string().url({ message: 'Invalid video URL' }).optional().or(z.literal('')),
  }),
});

export const updateNewsSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid news ID'),
  }),
  body: z.object({
    title: z.string()
      .min(5, 'Title must be at least 5 characters')
      .max(200, 'Title must not exceed 200 characters')
      .optional(),

    subtitle: z.string().optional(),

    content: z.string()
      .min(50, 'Content must be at least 50 characters')
      .optional(),

    summary: z.string()
      .min(20, 'Summary must be at least 20 characters')
      .max(500, 'Summary must not exceed 500 characters')
      .optional(),

    author: z.string()
      .min(2, 'Author name must be at least 2 characters')
      .optional(),

    category: z.string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID')
      .optional(),

    tags: z.array(z.string()).optional(),

    image: z.string().url('Invalid image URL').optional(),

    isFeatured: z.boolean().optional(),

    isBreaking: z.boolean().optional(),

    isVideo: z.boolean().optional(),

    videoUrl: z.string().url('Invalid video URL').optional().or(z.literal('')),
  }),
});

export const getNewsByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid news ID'),
  }),
});

export const deleteNewsSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid news ID'),
  }),
});
