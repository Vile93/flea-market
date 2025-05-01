import { OfferType } from '@prisma/client';

export type IOfferType = {
    [K in OfferType]: string;
};
