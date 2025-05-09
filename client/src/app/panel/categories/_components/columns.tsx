'use client';

import { DataTableColumnHeader } from '@/app/panel/categories/_components/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { Category } from '@/types/category.interface';
import DataTableAction from '@/app/panel/categories/_components/data-table-action';
import { deleteCategory } from '@/api/category-client.api';

export const columns: ColumnDef<Category>[] = [
    {
        id: 'actions',
        meta: {
            label: 'Действия',
        },
        cell: ({ row }) => {
            return <DataTableAction deleteFetch={deleteCategory} id={row.original.id.toString()} />;
        },
    },
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Айди" />;
        },
        meta: {
            label: 'Айди',
        },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Название" />;
        },
        meta: {
            label: 'Название',
        },
    },
] as const;
