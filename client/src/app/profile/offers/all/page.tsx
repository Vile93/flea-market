import { serverGetUserOffers } from '@/api/server-get-offers.api';
import { OfferList } from '@/app/profile/offers/all/_components/offer-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Мои объявления',
    description: 'Мои объявления',
};

export default async function UserOffers() {
    const data = await serverGetUserOffers();
    return <OfferList data={data} />;
}
