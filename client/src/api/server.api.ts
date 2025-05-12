import { BACKEND_API } from '@/constants/api.constant';
import { CategoriesAndLocations } from '@/types/categories-locations.interface';

export const getOfferCategoriesAndLocations = async () => {
    const res = await fetch(BACKEND_API + '/offers/categories-and-locations');
    const data: CategoriesAndLocations = await res.json();
    return data;
};
