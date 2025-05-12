'use client';

import { Region } from '@/types/region.interface';
import { ColumnDef } from '@tanstack/react-table';
import { ISearchField } from '@/types/search-field.interface';
import { getRegions } from '@/api/region.api';
import { IQueryPanelTable } from '@/types/query.interface';
import { useFetch } from '@/hooks/use-fetch.hook';
import DataTableWrapper from '@/components/table/data-table-wrapper';
import { Dispatch, SetStateAction } from 'react';

interface RegionListProps {
    data: Region[];
    totalCount: number;
    columns: ColumnDef<Region>[];
    constantsSearchField: ISearchField[];
    addModal: React.ReactElement<{ setIsOpenAddModal: Dispatch<SetStateAction<boolean>> }>;
}

export default function RegionList({ data, totalCount, columns, constantsSearchField, addModal }: RegionListProps) {
    const fetcher = useFetch<{ data: Region[]; totalCount: number }, IQueryPanelTable>(getRegions);
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
