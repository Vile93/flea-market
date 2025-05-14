import { PriceType } from '@/types/price-type.enum';
import { Category } from './category.interface';
import { Location } from './location.interface';
import { OfferType } from '@/types/offer-type.enum';
import { OfferStatus } from '@/types/offer-status.enum';
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
