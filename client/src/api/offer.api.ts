import { myFetch } from '@/api/main.api';
import { setQuery } from '@/lib/set-query';
import { CreateOffer, OfferModerateUpdate } from '@/types/offer.interface';
import { IQueryPanelTable, OfferQuery } from '@/types/query.interface';

export const getOffers = async (query?: OfferQuery) => {
    return myFetch(`/offers${setQuery(query)}`);
};

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

export const getOffersOnModeration = async (query?: IQueryPanelTable) => {
    return myFetch(`/offers/moderate${setQuery(query)}`);
};

export const updateOfferOnModeration = async (data: OfferModerateUpdate & { id: string }) => {
    const { id, status, content } = data;
    return myFetch(`/offers/${id}/moderate`, {
        method: 'PUT',
        body: JSON.stringify({ content, status }),
    });
};
