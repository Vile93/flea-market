'use client';

import { getCategories } from '@/api/category.api';
import DataTableWrapper from '@/components/table/data-table-wrapper';
import { useFetch } from '@/hooks/use-fetch.hook';
import { Category } from '@/types/category.interface';
import { IQueryPanelTable } from '@/types/query.interface';
import { ISearchField } from '@/types/search-field.interface';
import { ColumnDef } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';

interface CategoryListProps {
    columns: ColumnDef<Category>[];
    data: Category[];
    totalCount: number;
    constantsSearchField: ISearchField[];
    addModal: React.ReactElement<{ setIsOpenAddModal: Dispatch<SetStateAction<boolean>> }>;
}

export default function CategoryList({ columns, data, totalCount, constantsSearchField, addModal }: CategoryListProps) {
    const fetcher = useFetch<{ data: Category[]; totalCount: number }, IQueryPanelTable>(getCategories);

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
