import { z } from 'zod';

export const loginSchema = z.object({
    login: z.string().nonempty('Это обязательное поле').min(3, 'Минимальная длина логина 3 символа'),
    password: z
        .string()
        .nonempty('Это обязательное поле')
        .min(8, 'Минимальная длина пароля 8 символов')
        .max(32, 'Максимальная длина пароля 32 символа'),
});

export const registerSchema = loginSchema
    .pick({
        password: true,
    })
    .extend({
        name: z.string().nonempty('Это обязательное поле'),
        surname: z.string().optional(),
        username: z
            .string()
            .nonempty('Это обязательное поле')
            .min(3, 'Минимальная длина логина 3 символа')
            .max(32, 'Максимальная длина логина 32 символа'),
        email: z.string().nonempty('Это обязательное поле').email('Неверна введена почта'),
        phone: z
            .string()
            .nonempty('Это обязательное поле')
            .max(12, 'Максимальная допустимая длина номера телефона 12 символов')
            .refine(
                (phone) => {
                    const phoneRegex = new RegExp(/^375/);
                    return phoneRegex.test(phone);
                },
                {
                    message: 'Введенный номер телефона некорректен или не является белорусским',
                },
            ),
        repeatPassword: loginSchema.shape.password,
    })
    .refine((schema) => schema.password === schema.repeatPassword, {
        message: 'Пароли не совпадают',
        path: ['repeatPassword'],
    });
