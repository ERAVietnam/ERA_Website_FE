import { z } from 'zod';

export const projectDetailsSchema = z.object({
  name: z.string().min(1, 'Tên bài đăng dự án không được để trống').max(255, 'Tên bài đăng dự án tối đa 255 ký tự'),
  projectName: z.string().min(1, 'Tên dự án không được để trống').max(255, 'Tên dự án tối đa 255 ký tự'),
  slug: z
    .string()
    .min(1, 'Slug không được để trống')
    .max(255, 'Slug tối đa 255 ký tự')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug chỉ chứa chữ thường, số và dấu gạch ngang'),
  tags: z.array(z.string()).min(1, 'Vui lòng chọn ít nhất 1 tag'),
  location: z.string().min(1, 'Vui lòng chọn tỉnh/thành phố của dự án'),
  content: z.string().optional(),
  investor: z.string().max(255).optional(),
  ownership: z.string().max(255).optional(),
  area: z.string().max(100).optional(),
  density: z.string().max(100).optional(),
  scale: z.string().max(100).optional(),
  startYear: z.string().max(20).optional(),
  progress: z.string().max(100).optional(),
  isIndexed: z.boolean().optional(),
  canonicalUrl: z.string().max(500).optional(),
  imageMediaId: z.string().uuid().optional().nullable(),
});

const projectFaqSchema = z.object({
  question: z.string().trim().min(1, 'Câu hỏi không được để trống').max(500, 'Câu hỏi tối đa 500 ký tự'),
  answer: z
    .string()
    .max(5000, 'Câu trả lời tối đa 5000 ký tự')
    .refine(
      (value) =>
        value
          .replace(/<[^>]*>/g, '')
          .replace(/&nbsp;/gi, ' ')
          .trim().length > 0,
      'Câu trả lời không được để trống',
    ),
});

export const createProjectSchema = projectDetailsSchema.extend({
  faqs: z
    .array(projectFaqSchema)
    .min(2, 'Dự án phải có ít nhất 2 câu hỏi thường gặp')
    .max(5, 'Dự án chỉ được có tối đa 5 câu hỏi thường gặp'),
});

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = projectDetailsSchema.partial();

export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;
