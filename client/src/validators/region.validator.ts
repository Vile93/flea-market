import { z } from 'zod';

export const regionSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Название должно быть не менее 3 символов' })
        .max(50, { message: 'Название должно быть не более 50 символов' }),
    location_id: z
        .number({ message: 'Айди локации должно быть числом' })
        .min(1, { message: 'Айди локации должно быть больше 0' })
        .int({ message: 'Айди локации должно быть целым числом' }),
});
