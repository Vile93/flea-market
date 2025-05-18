import { serverGetModerateOffer } from '@/api/server-get-panel-data.api';
import OfferInfo from '@/app/panel/offers-on-moderation/[id]/_components/offer-info';

interface OffersOnModerationProps {
    params: { id: string };
}

export default async function OfferOnModeration({ params }: OffersOnModerationProps) {
    const data = await serverGetModerateOffer(params.id);
    return <OfferInfo data={data} />;
}
