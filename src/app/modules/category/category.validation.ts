import { z } from 'zod';

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string()
      .min(2, { message: 'Category name must be at least 2 characters' })
      .max(50, { message: 'Category name must not exceed 50 characters' }),

    description: z.string().optional(),

    icon: z.string().optional(),

    order: z.number().int().min(0).optional(),

    isActive: z.boolean().optional(),
  }),
});

export const updateCategorySchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID'),
  }),
  body: z.object({
    name: z.string()
      .min(2, 'Category name must be at least 2 characters')
      .max(50, 'Category name must not exceed 50 characters')
      .optional(),

    description: z.string().optional(),

    icon: z.string().optional(),

    order: z.number().int().min(0).optional(),

    isActive: z.boolean().optional(),
  }),
});

export const deleteCategorySchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID'),
  }),
});

export const getCategoryBySlugSchema = z.object({
  params: z.object({
    slug: z.string().min(1, 'Slug is required'),
  }),
});
