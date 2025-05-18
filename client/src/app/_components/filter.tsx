'use client';

import styles from '../style.module.css';
import { Button } from '@/components/ui/button';
import { CategoriesAndLocations } from '@/types/categories-locations.interface';
import { Categories } from '@/app/_components/categories';
import { Locations } from '@/app/_components/locations';
import { Price } from '@/app/_components/price';
import { Search } from '@/app/_components/search';
import { State } from '@/app/_components/state';
import { Sort } from '@/app/_components/sort';
import { Offers } from '@/app/_components/offers';
import { OfferFind } from '@/types/offer.interface';
import { useEffect, useMemo, useState } from 'react';
import { COUNT_OF_OFFERS_PER_PAGE } from '@/api/constraint.api';
import { useFetch } from '@/hooks/use-fetch.hook';
import { getOffers } from '@/api/offer.api';
import { OfferQuery } from '@/types/query.interface';
import { Spinner } from '@/components/loader';
import { OfferType } from '@/types/offer-type.enum';

interface FilterProps {
    categoriesAndLocations: CategoriesAndLocations;
    offers: OfferFind[];
    totalCount: number;
}

export function Filter({ categoriesAndLocations, offers, totalCount }: FilterProps) {
    /*   const [selectedSort, setSelectedSort] = useState<{
        type: string;
        isAsc: boolean;
    } | null>(null); */
    const fetchOffers = useFetch<{ data: OfferFind[]; totalCount: number }, OfferQuery>(getOffers);
    const [currPage, setCurrPage] = useState<number>(1);
    const [isRefetch, setIsRefetch] = useState<boolean>(false);
    const [sort, setSort] = useState<{ orderField: string; orderDirection: 'asc' | 'desc' } | null>(null);
    const [state, setState] = useState<OfferType | null>(null);
    const [search, setSearch] = useState<string>('');
    const [price, setPrice] = useState<{ priceFrom?: string; priceTo?: string } | null>(null);
    const [region, setRegion] = useState<{ id: string; value: string } | null>(null);
    const [type, setType] = useState<{ id: string; value: string } | null>(null);
    const totalPages = useMemo(() => {
        if (typeof fetchOffers.data?.totalCount === 'number') {
            return Math.ceil(fetchOffers.data.totalCount / COUNT_OF_OFFERS_PER_PAGE) || 1;
        }
        return Math.ceil(totalCount / COUNT_OF_OFFERS_PER_PAGE) || 1;
    }, [totalCount, fetchOffers.data?.totalCount]);
    const newArgsForOffers: OfferQuery = useMemo(() => {
        return {
            skip: String((currPage - 1) * COUNT_OF_OFFERS_PER_PAGE),
            take: String(COUNT_OF_OFFERS_PER_PAGE),
            orderField: sort?.orderField,
            orderDirection: sort?.orderDirection,
            type: state ?? undefined,
            priceFrom: price?.priceFrom,
            priceTo: price?.priceTo,
            search,
            region_id: region?.value,
            type_id: type?.value,
        };
    }, [currPage, sort, state, search, price, region, type]);
    console.log(price);
    const searchHandle = () => {
        setCurrPage(1);
        setIsRefetch(true);
    };
    const resetHandle = () => {
        setSort(null);
        setState(null);
        setPrice(null);
        setType(null);
        setRegion(null);
        setSearch('');
    };
    useEffect(() => {
        if (fetchOffers.newArgs) {
            fetchOffers.fetchData();
        }
    }, [fetchOffers.newArgs]);
    useEffect(() => {
        if (isRefetch) {
            setIsRefetch(false);
            fetchOffers.setNewArgs([newArgsForOffers]);
        }
    }, [isRefetch]);
    return (
        <div className={`${styles.filter} mt-16`}>
            <div className={`${styles.filters} sticky top-2`}>
                <Categories data={categoriesAndLocations} setType={setType} type={type} />
                <Locations data={categoriesAndLocations} setRegion={setRegion} region={region} />
                <Price price={price} setPrice={setPrice} />
                <State state={state} setState={setState} />
                <div className={`flex flex-col`}>
                    <Button className="mt-2 cursor-pointer" onClick={searchHandle}>
                        Найти
                    </Button>
                    <Button className="mt-2 cursor-pointer" variant={'destructive'} onClick={resetHandle}>
                        Сбросить
                    </Button>
                </div>
            </div>
            <Sort className={`${styles.sort}`} setSort={setSort} sort={sort} />
            <Search className={`${styles.search}`} search={search} setSearch={setSearch} />
            {!fetchOffers.isLoading ? (
                <Offers
                    className={`${styles.offers}`}
                    offers={fetchOffers.data?.data ?? offers}
                    currPage={currPage}
                    totalPages={totalPages}
                    setCurrPage={setCurrPage}
                    setIsRefetch={setIsRefetch}
                />
            ) : null}
            {fetchOffers.isLoading ? <Spinner size={'large'} /> : null}
        </div>
    );
}
