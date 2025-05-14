import { OfferType } from '@/types/offer-type.enum';
import { PriceType } from '@/types/price-type.enum';
import { z } from 'zod';

export const offerSchema = z
    .object({
        title: z
            .string()
            .min(3, { message: 'Название должно быть не менее 3 символов' })
            .max(120, { message: 'Название должно быть не более 120 символов' }),
        description: z
            .string()
            .min(10, { message: 'Описание должно быть не менее 10 символов' })
            .max(3000, { message: 'Описание должно быть не более 3000 символов' }),
        price: z.coerce.number().optional(),
        type_id: z.coerce.number({ message: 'Тип должен быть выбран' }).refine((value) => value !== 0, {
            message: 'Тип должен быть выбран',
        }),
        region_id: z.coerce.number({ message: 'Регион должен быть выбран' }).refine((value) => value !== 0, {
            message: 'Регион должен быть выбран',
        }),
        price_type: z.enum([PriceType.CONTRACT, PriceType.FREE, PriceType.PAY], {
            message: 'Тип цены должен быть выбран',
        }),
        type: z.enum([OfferType.NEW, OfferType.OLD], { message: 'Тип должен быть выбран' }),
    })
    .refine(
        (schema) => {
            if (schema.price_type === PriceType.PAY) {
                console.log(schema.price);
                if (schema.price === null) {
                    return true;
                }
            }
            return true;
        },
        {
            message: 'Это обязательное поле',
            path: ['price'],
        },
    );
