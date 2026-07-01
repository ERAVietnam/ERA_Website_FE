import { z } from 'zod';

const newsFaqSchema = z.object({
  question: z.string().trim().min(1, 'Câu hỏi không được để trống').max(500, 'Câu hỏi tối đa 500 ký tự'),
  answer: z
    .string()
    .max(5000, 'Câu trả lờ tối đa 5000 ký tự')
    .refine(
      (value) =>
        value
          .replace(/<[^>]*>/g, '')
          .replace(/&nbsp;/gi, ' ')
          .trim().length > 0,
      'Câu trả lờ không được để trống',
    ),
});

export const createArticleSchema = z.object({
  title: z.string().min(1, 'Tiêu đề không được để trống').max(255, 'Tiêu đề tối đa 255 ký tự'),
  slug: z
    .string()
    .min(1, 'Slug không được để trống')
    .max(255, 'Slug tối đa 255 ký tự')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug chỉ chứa chữ thường, số và dấu gạch ngang'),
  summary: z.string().max(500, 'Tóm tắt tối đa 500 ký tự').optional(),
  content: z.string().min(1, 'Nội dung không được để trống'),
  faqs: z
    .array(newsFaqSchema)
    .min(2, 'Bài viết phải có ít nhất 2 câu hỏi thường gặp')
    .max(5, 'Bài viết chỉ được có tối đa 5 câu hỏi thường gặp'),
  categoryId: z.string().uuid('Vui lòng chọn danh mục hợp lệ'),
  featuredImageMediaId: z.string().uuid().optional().nullable(),
  pdfMediaId: z.string().uuid().optional().nullable(),
  source: z.string().max(255).optional(),
  author: z.string().max(100).optional(),
  metaTitle: z.string().max(255).optional(),
  metaDescription: z.string().optional(),
  isFeatured: z.boolean().optional(),
  isIndexed: z.boolean().optional(),
  countryCode: z.enum(["SG", "US", "VN"]).optional().nullable(),
});

export type CreateArticleSchema = z.infer<typeof createArticleSchema>;

export const updateArticleSchema = createArticleSchema.partial();

export type UpdateArticleSchema = z.infer<typeof updateArticleSchema>;
