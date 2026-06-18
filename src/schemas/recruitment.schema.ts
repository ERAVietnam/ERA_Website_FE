import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createJobSchema = z.object({
  title: z
    .string()
    .min(1, "Tên công việc không được để trống")
    .max(255, "Tên công việc tối đa 255 ký tự"),
  slug: z
    .string()
    .min(1, "Slug không được để trống")
    .max(255, "Slug tối đa 255 ký tự")
    .regex(slugRegex, "Slug chỉ chứa chữ thường, số và dấu gạch ngang"),
  location: z
    .string()
    .min(1, "Địa điểm không được để trống")
    .max(100, "Địa điểm tối đa 100 ký tự"),
  type: z
    .string()
    .min(1, "Loại hình không được để trống")
    .max(50, "Loại hình tối đa 50 ký tự"),
  workMode: z
    .string()
    .max(50, "Hình thức tối đa 50 ký tự")
    .optional(),
  experience: z
    .string()
    .max(100, "Kinh nghiệm tối đa 100 ký tự")
    .optional(),
  salary: z
    .string()
    .max(255, "Mức lương tối đa 255 ký tự")
    .optional(),
  workingTime: z.string().optional(),
  quantity: z
    .number()
    .min(1, "Số lượng tối thiểu là 1")
    .optional(),
  deadline: z
    .string()
    .optional()
    .refine((val) => !val || !Number.isNaN(Date.parse(val)), {
      message: "Hạn nộp không hợp lệ",
    }),
  description: z.string().min(1, "Mô tả công việc không được để trống"),
  requirements: z.string().min(1, "Yêu cầu ứng viên không được để trống"),
  benefits: z.string().min(1, "Quyền lợi không được để trống"),
});

export type CreateJobSchema = z.infer<typeof createJobSchema>;

export const updateJobSchema = createJobSchema.partial();

export type UpdateJobSchema = z.infer<typeof updateJobSchema>;
