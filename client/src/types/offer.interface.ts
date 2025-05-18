import { PriceType } from '@/types/price-type.enum';
import { Category } from './category.interface';
import { Location } from './location.interface';
import { OfferType } from '@/types/offer-type.enum';
import { OfferStatus } from '@/types/offer-status.enum';
import { Type } from '@/types/type.interface';
import { Region } from '@/types/region.interface';

export interface OfferCategoriesAndLocations {
    categories: Category[];
    locations: Location[];
}

export interface CreateOffer {
    title: string;
    description: string;
    price?: number;
    price_type: PriceType;
    type: OfferType;
    type_id: number;
    region_id: number;
    imagesLinks: string[];
}

export interface Offer {
    id: number;
    title: string;
    description: string;
    type: OfferType;
    price_type: PriceType;
    price: number;
    user_id: number;
    type_id: number;
    region_id: number;
    status: OfferStatus;
}

export interface OfferFind extends Offer {
    OfferImages: OfferImage[];
    region_ref: Region;
    type_ref: Type;
}

export interface OfferModerate extends Offer {
    region_ref: Region;
    type_ref: Type;
}

export interface OfferModerateWithImages extends OfferModerate {
    OfferImages: OfferImage[];
}

export interface OfferColumnModerate extends Offer {
    region_name: string;
    type_name: string;
}

export interface OfferModerateUpdate {
    status: OfferStatus.ACCEPTED | OfferStatus.REJECTED;
    content?: string;
}

export interface OfferUser extends Offer {
    region_ref: Region;
    OfferImages: OfferImage[];
}

export interface OfferImage {
    id: number;
    link: string;
    offer_id: string;
    order: number;
}
