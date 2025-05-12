'use client';

import { ISearchField } from '@/types/search-field.interface';
import { User } from '@/types/user.interface';
import { SetStateAction } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Dispatch } from 'react';
import DataTableWrapper from '@/components/table/data-table-wrapper';
import { useFetch } from '@/hooks/use-fetch.hook';
import { IQueryPanelTable } from '@/types/query.interface';
import { getUsers } from '@/api/user.api';

interface UserListProps {
    data: User[];
    totalCount: number;
    columns: ColumnDef<User>[];
    constantsSearchField: ISearchField[];
    addModal: React.ReactElement<{ setIsOpenAddModal: Dispatch<SetStateAction<boolean>> }>;
    isDisabledAddButton?: boolean;
}

export default function UserList({
    data,
    totalCount,
    columns,
    constantsSearchField,
    addModal,
    isDisabledAddButton,
}: UserListProps) {
    const fetcher = useFetch<{ data: User[]; totalCount: number }, IQueryPanelTable>(getUsers);
    return (
        <DataTableWrapper
            data={fetcher.isCompleted ? fetcher.data?.data ?? [] : data}
            totalCount={totalCount}
            columns={columns}
            constantsSearchField={constantsSearchField}
            addModal={addModal}
            fetcher={fetcher}
            isDisabledAddButton={isDisabledAddButton}
        />
    );
}
