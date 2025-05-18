import { Offer } from '@/app/_components/offer';
import { OfferPagination } from '@/app/_components/offer-pagination';
import { OfferFind } from '@/types/offer.interface';
import { CircleSlash2 } from 'lucide-react';
import React from 'react';

interface OffersProps extends React.HTMLAttributes<HTMLDivElement> {
    offers: OfferFind[];
    totalPages: number;
    currPage: number;
    setCurrPage: React.Dispatch<React.SetStateAction<number>>;
    setIsRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Offers({ className, offers, currPage, totalPages, setCurrPage, setIsRefetch, ...props }: OffersProps) {
    return (
        <div className={`relative self-start ${className ?? ''}`} {...props}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {offers.map((offer) => (
                    <Offer key={offer.id} offer={offer} />
                ))}
            </div>
            {offers.length === 0 ? (
                <div className="flex flex-col items-center gap-4">
                    <div>
                        <CircleSlash2 className="w-12 h-12" />
                    </div>
                    <div className="text-2xl font-bold">Ничего не найдено</div>
                </div>
            ) : null}
            <div className="flex justify-end">
                {totalPages !== 1 ? (
                    <OfferPagination
                        totalPages={totalPages}
                        currPage={currPage}
                        setCurrPage={setCurrPage}
                        setIsRefetch={setIsRefetch}
                    />
                ) : null}
            </div>
        </div>
    );
}
