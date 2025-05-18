import { IMAGE_API } from '@/constants/api.constant';
import { OfferFind } from '@/types/offer.interface';
import { PriceType } from '@/types/price-type.enum';
import { CameraOff, MapPin } from 'lucide-react';
import Link from 'next/link';

interface OfferProps {
    offer: OfferFind;
}

export function Offer({ offer }: OfferProps) {
    return (
        <Link href={`/offers/${offer.id}`}>
            {offer.OfferImages.length === 0 ? (
                <div className="relative">
                    <div className="aspect-square w-full h-64 bg-gray-500 opacity-20 dark:opacity-50 dark:bg-white rounded-xl"></div>
                    <CameraOff className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 dark:opacity-80 w-16 h-16" />
                </div>
            ) : (
                <img
                    className="h-64 aspect-square object-cover rounded-xl"
                    src={`${IMAGE_API}/${offer.OfferImages.toSorted((a, b) => a.order - b.order)[0].link}`}
                />
            )}
            <div className="text-xl font-bold mt-2 wrap-anywhere">{offer.title}</div>
            {offer.price_type === PriceType.CONTRACT ? <div className="text-md font-bold">Договорная</div> : null}
            {offer.price_type === PriceType.PAY ? <div className="text-md font-bold">{offer.price} BYN</div> : null}
            {offer.price_type === PriceType.FREE ? <div className="text-md font-bold">Бесплатно</div> : null}
            <div className="flex text-sm items-center gap-2">
                <MapPin width={16} /> {offer.region_ref.name}
            </div>
        </Link>
    );
}
