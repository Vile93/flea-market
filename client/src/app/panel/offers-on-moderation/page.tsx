import { serverGetPanelData } from '@/api/server-get-panel-data.api';
import { columns } from '@/app/panel/offers-on-moderation/_components/columns';
import OfferList from '@/app/panel/offers-on-moderation/_components/offer-list';
import { OFFER_MODERATION_COLUMNS } from '@/constants/panel.constant';
import { OfferModerate } from '@/types/offer.interface';

export default async function OffersOnModeration() {
    const data = await serverGetPanelData<OfferModerate>('offers/moderate');
    return (
        <OfferList
            data={data.data}
            totalCount={data.totalCount}
            columns={columns}
            constantsSearchField={OFFER_MODERATION_COLUMNS}
        />
    );
}
