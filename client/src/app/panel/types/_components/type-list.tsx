'use client';

import { ISearchField } from '@/types/search-field.interface';
import { Type } from '@/types/type.interface';
import { SetStateAction } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Dispatch } from 'react';
import DataTableWrapper from '@/components/table/data-table-wrapper';
import { useFetch } from '@/hooks/use-fetch.hook';
import { IQueryPanelTable } from '@/types/query.interface';
import { getTypes } from '@/api/type.api';

interface TypeListProps {
    data: Type[];
    totalCount: number;
    columns: ColumnDef<Type>[];
    constantsSearchField: ISearchField[];
    addModal: React.ReactElement<{ setIsOpenAddModal: Dispatch<SetStateAction<boolean>> }>;
}

export default function TypeList({ data, totalCount, columns, constantsSearchField, addModal }: TypeListProps) {
    const fetcher = useFetch<{ data: Type[]; totalCount: number }, IQueryPanelTable>(getTypes);
    return (
        <DataTableWrapper
            fetcher={fetcher}
            data={fetcher.isCompleted ? fetcher.data?.data ?? [] : data}
            totalCount={totalCount}
            columns={columns}
            constantsSearchField={constantsSearchField}
            addModal={addModal}
        />
    );
}
