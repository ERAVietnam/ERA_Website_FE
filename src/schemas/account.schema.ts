import { z } from 'zod';

export const createAccountSchema = z
  .object({
    name: z.string().min(1, 'Họ tên không được để trống').max(100, 'Họ tên tối đa 100 ký tự'),
    email: z.string().min(1, 'Email không được để trống').email('Email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
    confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu'),
    permissionIds: z.array(z.string().uuid()).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

export type CreateAccountSchema = z.infer<typeof createAccountSchema>;

export const updateAccountSchema = z.object({
  name: z.string().min(1, 'Họ tên không được để trống').max(100, 'Họ tên tối đa 100 ký tự').optional(),
  email: z.string().email('Email không hợp lệ').optional(),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự').optional(),
  isActive: z.boolean().optional(),
});

export type UpdateAccountSchema = z.infer<typeof updateAccountSchema>;
