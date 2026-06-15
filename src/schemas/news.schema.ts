import { z } from 'zod';

export const createArticleSchema = z.object({
  title: z.string().min(1, 'Tiêu đề không được để trống').max(255, 'Tiêu đề tối đa 255 ký tự'),
  slug: z
    .string()
    .min(1, 'Slug không được để trống')
    .max(255, 'Slug tối đa 255 ký tự')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug chỉ chứa chữ thường, số và dấu gạch ngang'),
  summary: z.string().max(500, 'Tóm tắt tối đa 500 ký tự').optional(),
  content: z.string().min(1, 'Nội dung không được để trống'),
  categoryId: z.string().uuid('Vui lòng chọn danh mục hợp lệ'),
  featuredImageMediaId: z.string().uuid().optional().nullable(),
  source: z.string().max(255).optional(),
  author: z.string().max(100).optional(),
  metaTitle: z.string().max(255).optional(),
  metaDescription: z.string().optional(),
  isFeatured: z.boolean().optional(),
  countryCode: z.string().max(10).optional(),
});

export type CreateArticleSchema = z.infer<typeof createArticleSchema>;

export const updateArticleSchema = createArticleSchema.partial();

export type UpdateArticleSchema = z.infer<typeof updateArticleSchema>;
