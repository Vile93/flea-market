import { z } from 'zod';

export const typeSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Название должно быть больше 3 символов' })
        .max(50, { message: 'Название должно быть меньше 50 символов' }),
    category_id: z
        .number({ message: 'Айди категории должно быть числом' })
        .min(1, { message: 'Айди категории должен быть больше 0' })
        .int({ message: 'Айди категории должно быть целым числом' }),
});
