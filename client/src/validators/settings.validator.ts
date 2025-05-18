import { userCreateSchema, userUpdateSchema } from '@/validators/user.validator';
import { z } from 'zod';

export const settingsSchema = z
    .object({
        name: userUpdateSchema.shape.name,
        surname: userCreateSchema.shape.surname,
        oldPassword: z
            .string()
            .optional()
            .refine((pass) => !pass || pass.length >= 8, {
                message: 'Минимальная длина пароля 8 символов',
            })
            .refine((pass) => !pass || pass.length <= 32, {
                message: 'Максимальная длина пароля 32 символа',
            }),
        newPassword: z
            .string()
            .optional()
            .refine((pass) => !pass || pass.length >= 8, {
                message: 'Минимальная длина пароля 8 символов',
            })
            .refine((pass) => !pass || pass.length <= 32, {
                message: 'Максимальная длина пароля 32 символа',
            }),
    })
    .refine(
        (schema) => {
            if (schema.newPassword || schema.oldPassword) {
                if (!schema.newPassword) {
                    return false;
                }
            }
            return true;
        },
        {
            message: 'При смене пароля это поле обязательно для заполнения',
            path: ['newPassword'],
        },
    )
    .refine(
        (schema) => {
            if (schema.newPassword || schema.oldPassword) {
                if (!schema.oldPassword) {
                    return false;
                }
            }
            return true;
        },
        {
            message: 'При смене пароля это поле обязательно для заполнения',
            path: ['oldPassword'],
        },
    );
