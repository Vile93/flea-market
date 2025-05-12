import { z } from 'zod';

export const locationSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Название должно быть не меньше 3 символов' })
        .max(50, { message: 'Название должно быть не больше 50 символов' }),
});
