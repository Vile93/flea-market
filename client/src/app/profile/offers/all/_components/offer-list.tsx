'use client';

import { deleteUserOffer, getUserOffers } from '@/api/user.api';
import { Nav } from '@/app/profile/offers/_components/nav';
import { Offer } from '@/app/profile/offers/all/_components/offer';
import { Spinner } from '@/components/loader';
import { Title } from '@/components/title';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useFetch } from '@/hooks/use-fetch.hook';
import { Offer as IOffer, OfferUser } from '@/types/offer.interface';
import { useState, useEffect, useMemo } from 'react';

interface OfferListProps {
    data: OfferUser[];
}

export function OfferList({ data }: OfferListProps) {
    const deleteOffer = useFetch<IOffer, { id: string }>(deleteUserOffer);
    const getOffers = useFetch<OfferUser[], null>(getUserOffers);
    const [isReloadOffers, setIsReloadOffers] = useState<boolean>(false);
    const offers = useMemo(() => {
        return getOffers.data ?? data;
    }, [getOffers.data, data]);
    useEffect(() => {
        if (isReloadOffers) {
            getOffers.fetchData(true);
            setIsReloadOffers(false);
        }
    }, [isReloadOffers]);
    useEffect(() => {
        if (deleteOffer.isSuccessCompleted && deleteOffer.statusCode === 200) {
            setIsReloadOffers(true);
        }
    }, [deleteOffer.data]);
    useEffect(() => {
        if (deleteOffer.newArgs) {
            deleteOffer.fetchData(true);
        }
    }, [deleteOffer.newArgs]);
    return (
        <Card className="mt-16 mb-4">
            <CardHeader>
                <div className="flex gap-2 justify-between">
                    <Title name="Мои объявления" />
                    <Nav />
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    {getOffers.isLoading ? <Spinner size={'large'} /> : null}
                    {!getOffers.isLoading
                        ? offers.map((offer) => (
                              <Offer offer={offer} key={offer.id} setDeleteOffer={deleteOffer.setNewArgs} />
                          ))
                        : null}
                </div>
            </CardContent>
        </Card>
    );
}
