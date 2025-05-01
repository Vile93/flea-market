import { PriceType } from '@prisma/client';

export type IPriceType = {
    [K in PriceType]: string;
};
