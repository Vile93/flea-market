import { OfferStatus } from '@/types/offer-status.enum';
import { OfferType } from '@/types/offer-type.enum';

interface IOfferOrder {
    field: string;
    direction: 'asc' | 'desc';
    russianName: string;
    value: OFFER_ORDERS_VALUES;
}

export enum OFFER_ORDERS_VALUES {
    LOW_PRICE = 'LOW_PRICE',
    HIGH_PRICE = 'HIGH_PRICE',
    NEW_OFFERS = 'NEW_OFFERS',
    OLD_OFFERS = 'OLD_OFFERS',
}

export const OFFER_ORDERS: IOfferOrder[] = [
    { field: 'price', direction: 'asc', russianName: 'Дешёвые', value: OFFER_ORDERS_VALUES.LOW_PRICE },
    { field: 'price', direction: 'desc', russianName: 'Дорогие', value: OFFER_ORDERS_VALUES.HIGH_PRICE },
    { field: 'createdAt', direction: 'asc', russianName: 'Новые объявления', value: OFFER_ORDERS_VALUES.NEW_OFFERS },
    { field: 'createdAt', direction: 'desc', russianName: 'Старые объявления', value: OFFER_ORDERS_VALUES.OLD_OFFERS },
] as const;

interface IOfferState {
    value: OfferType;
    russianName: string;
}

export const OFFER_STATES = [
    { value: OfferType.NEW, russianName: 'новое' },
    { value: OfferType.OLD, russianName: 'б/у' },
] as IOfferState[];
