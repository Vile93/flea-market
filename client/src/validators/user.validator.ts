import { Roles } from '@/types/roles.enum';
import { z } from 'zod';

export const userUpdateSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Имя должно быть не менее 3 символов' })
        .max(50, { message: 'Имя должно быть не более 50 символов' }),
    surname: z
        .string()
        .optional()
        .refine((surname) => !surname || surname.length >= 3, {
            message: 'Фамилия должна быть не менее 3 символов',
        })
        .refine((surname) => !surname || surname.length <= 50, {
            message: 'Фамилия должна быть не более 50 символов',
        }),
    email: z.string().email({ message: 'Неверно введена почта' }),
    phone: z.string().length(12, { message: 'Телефон должен содержать 12 символов' }),
    username: z
        .string()
        .min(3, { message: 'Логин должен быть не менее 3 символов' })
        .max(50, { message: 'Логин должен быть не более 32 символов' }),
    role: z.enum([Roles.ADMIN, Roles.MODERATOR, Roles.USER], {
        message: 'Роль должна быть администратором или модератором',
    }),
    password: z
        .string()
        .optional()
        .refine((password) => !password || password.length >= 8, {
            message: 'Пароль должен быть не менее 8 символов',
        })
        .refine((password) => !password || password.length <= 24, {
            message: 'Пароль должен быть не более 24 символов',
        }),
});

export const userCreateSchema = userUpdateSchema
    .pick({
        name: true,
        surname: true,
        email: true,
        phone: true,
        username: true,
        role: true,
    })
    .extend({
        password: z
            .string()
            .min(8, { message: 'Пароль должен быть не менее 8 символов' })
            .max(24, { message: 'Пароль должен быть не более 24 символов' }),
    });
