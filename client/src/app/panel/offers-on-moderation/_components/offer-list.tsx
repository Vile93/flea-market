'use client';

import { getOffersOnModeration } from '@/api/offer.api';
import DataTableWrapper from '@/components/table/data-table-wrapper';
import { useFetch } from '@/hooks/use-fetch.hook';
import { OfferColumnModerate, OfferModerate } from '@/types/offer.interface';
import { IQueryPanelTable } from '@/types/query.interface';
import { ISearchField } from '@/types/search-field.interface';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

interface OfferListProps {
    columns: ColumnDef<OfferColumnModerate>[];
    data: OfferModerate[];
    totalCount: number;
    constantsSearchField: ISearchField[];
}

export default function OfferList({ columns, constantsSearchField, data, totalCount }: OfferListProps) {
    const fetcher = useFetch<{ data: OfferModerate[]; totalCount: number }, IQueryPanelTable>(getOffersOnModeration);
    const transformedData: OfferColumnModerate[] = useMemo(
        () =>
            (!fetcher.isCompleted
                ? data.map((offer) => {
                      const offerColumnModerate: OfferColumnModerate = {
                          description: offer.description,
                          id: offer.id,
                          price: offer.price,
                          price_type: offer.price_type,
                          region_id: offer.region_id,
                          region_name: offer.region_ref.name,
                          status: offer.status,
                          title: offer.title,
                          type: offer.type,
                          type_id: offer.type_id,
                          type_name: offer.type_ref.name,
                          user_id: offer.user_id,
                      };
                      return offerColumnModerate;
                  })
                : fetcher.data?.data?.map((offer) => {
                      const offerColumnModerate: OfferColumnModerate = {
                          description: offer.description,
                          id: offer.id,
                          price: offer.price,
                          price_type: offer.price_type,
                          region_id: offer.region_id,
                          region_name: offer.region_ref.name,
                          status: offer.status,
                          title: offer.title,
                          type: offer.type,
                          type_id: offer.type_id,
                          type_name: offer.type_ref.name,
                          user_id: offer.user_id,
                      };
                      return offerColumnModerate;
                  })) ?? [],
        [fetcher.data],
    );
    return (
        <DataTableWrapper
            fetcher={fetcher}
            data={transformedData}
            columns={columns}
            constantsSearchField={constantsSearchField}
            totalCount={totalCount}
            isDisabledAddButton={true}
        />
    );
}
