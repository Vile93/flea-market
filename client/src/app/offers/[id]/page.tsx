import { serverGetOffer } from '@/api/server-get-offers.api';
import { OfferInfo } from '@/app/offers/[id]/_components/offer-info';
import NotFound from '@/components/not-found';
import { OfferFind } from '@/types/offer.interface';
import { User } from '@/types/user.interface';

interface OfferProps {
    params: { id: string };
}

export default async function Offer({ params }: OfferProps) {
    const data = await serverGetOffer((await params).id);
    if ('statusCode' in data && data.statusCode === 404) {
        return <NotFound />;
    }
    return <OfferInfo data={data as OfferFind & { user_ref: Pick<User, 'avatar_path' | 'phone' | 'username'> }} />;
}
