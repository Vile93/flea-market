import { z } from 'zod';

export const categorySchema = z.object({
    name: z
        .string()
        .min(3, 'Название категории должно быть не меньше 3 символов')
        .max(50, 'Название категории не может быть больше 50 символов'),
});
