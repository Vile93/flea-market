import { Metadata } from 'next';
import { Filter } from './_components/filter';
import { getOfferCategoriesAndLocations } from '@/api/server.api';
import { serverGetOffers } from '@/api/server-get-offers.api';

export const metadata: Metadata = {
    title: 'Zorka',
    description: 'Zorka',
};

export default async function Home() {
    const offers = await serverGetOffers();
    const categoriesAndLocations = await getOfferCategoriesAndLocations();
    return (
        <Filter categoriesAndLocations={categoriesAndLocations} offers={offers.data} totalCount={offers.totalCount} />
    );
}
