'use client';

import { getCategories } from '@/api/category-client.api';
import DataTableWrapper from '@/app/panel/categories/_components/data-table-wrapper';
import { useFetch } from '@/hooks/use-fetch.hook';
import { IQueryPanelTable } from '@/types/query.interface';
import { ISearchField } from '@/types/search-field.interface';
import { ColumnDef } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';

interface CategoryListProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
    totalCount: number;
    constantsSearchField: ISearchField[];
    addModal: React.ReactElement<{ setIsOpenAddModal: Dispatch<SetStateAction<boolean>> }>;
}

export default function CategoryList<T>({
    columns,
    data,
    totalCount,
    constantsSearchField,
    addModal,
}: CategoryListProps<T>) {
    const fetcher = useFetch<{ data: T[]; totalCount: number }, IQueryPanelTable>(getCategories);

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
