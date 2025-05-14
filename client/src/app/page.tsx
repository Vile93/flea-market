import { Metadata } from 'next';
import { Filter } from './_components/filter';
import { getOfferCategoriesAndLocations } from '@/api/server.api';

export const metadata: Metadata = {
    title: 'Zorka',
    description: 'Zorka',
};

export default async function Home() {
    const data = await getOfferCategoriesAndLocations();
    return <Filter data={data} />;
}
