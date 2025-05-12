'use client';

import { deleteType } from '@/api/type.api';
import TypeUpdateModal from '@/app/panel/types/_components/type-update-modal';
import DataTableAction from '@/components/table/data-table-action';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { Type } from '@/types/type.interface';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Type>[] = [
    {
        id: 'actions',
        meta: {
            label: 'Действия',
        },
        cell: ({ row }) => {
            return (
                <DataTableAction
                    deleteFetch={deleteType}
                    data={row.original}
                    id={row.original.id.toString()}
                    updateModal={<TypeUpdateModal />}
                />
            );
        },
    },
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Айди" />;
        },
        meta: { label: 'Айди' },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Название" />;
        },
        meta: { label: 'Название' },
    },
    {
        accessorKey: 'category_id',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Айди категории" />;
        },
        meta: { label: 'Айди категории' },
    },
];
