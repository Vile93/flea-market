import { myFetch } from '@/api/main.api';

export const sendImages = async (offerId: string, formData: FormData) => {
    return myFetch(`/offer-files/${offerId}`, {
        method: 'POST',
        body: formData,
    });
};
