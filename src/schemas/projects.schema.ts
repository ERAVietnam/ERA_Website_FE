import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(1, 'Tên bài đăng dự án không được để trống').max(255, 'Tên bài đăng dự án tối đa 255 ký tự'),
  projectName: z.string().min(1, 'Tên dự án không được để trống').max(255, 'Tên dự án tối đa 255 ký tự'),
  slug: z
    .string()
    .min(1, 'Slug không được để trống')
    .max(255, 'Slug tối đa 255 ký tự')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug chỉ chứa chữ thường, số và dấu gạch ngang'),
  type: z.enum(['apartment', 'townhouse', 'villa', 'land'], {
    message: 'Vui lòng chọn loại hình dự án',
  }),
  status: z.enum(['new', 'booking', 'selling', 'upcoming', 'handed_over'], {
    message: 'Vui lòng chọn trạng thái dự án',
  }),
  location: z.string().min(1, 'Vui lòng nhập đầy đủ địa điểm dự án'),
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

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = createProjectSchema.partial();

export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;
