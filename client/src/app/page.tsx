import { Filter } from './_components/filter';
import { getOfferCategoriesAndLocations } from '@/api/server.api';

export default async function Home() {
    const data = await getOfferCategoriesAndLocations();
    return <Filter data={data} />;
}
