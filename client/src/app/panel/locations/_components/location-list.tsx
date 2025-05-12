'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Location } from '@/types/location.interface';
import DataTableWrapper from '@/components/table/data-table-wrapper';
import { useFetch } from '@/hooks/use-fetch.hook';
import { IQueryPanelTable } from '@/types/query.interface';
import { getLocations } from '@/api/location.api';
import { ISearchField } from '@/types/search-field.interface';
import { Dispatch, SetStateAction } from 'react';

interface LocationListProps {
    columns: ColumnDef<Location>[];
    data: Location[];
    totalCount: number;
    constantsSearchField: ISearchField[];
    addModal: React.ReactElement<{ setIsOpenAddModal: Dispatch<SetStateAction<boolean>> }>;
}

export default function LocationList({ columns, data, totalCount, constantsSearchField, addModal }: LocationListProps) {
    const fetcher = useFetch<{ data: Location[]; totalCount: number }, IQueryPanelTable>(getLocations);
    return (
        <DataTableWrapper
            fetcher={fetcher}
            data={fetcher.isCompleted ? fetcher.data?.data ?? [] : data}
            columns={columns}
            constantsSearchField={constantsSearchField}
            totalCount={totalCount}
            addModal={addModal}
        />
    );
}
