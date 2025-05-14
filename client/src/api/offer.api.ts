import { myFetch } from '@/api/main.api';
import { CreateOffer } from '@/types/offer.interface';

export const sendOfferImage = async (formData: FormData) => {
    return myFetch(`/offers/image`, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: globalThis?.localStorage?.getItem('token')
                ? 'Bearer ' + globalThis.localStorage.getItem('token')
                : '',
        },
    });
};

export const createOffer = async (offer: CreateOffer) => {
    return myFetch('/offers', {
        method: 'POST',
        body: JSON.stringify(offer),
    });
};
