import { OfferStatus } from '@prisma/client';

export type IOfferStatus = {
    [K in OfferStatus]: string;
};
