'use client';

import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { Category } from '@/types/category.interface';
import DataTableAction from '@/components/table/data-table-action';
import { deleteCategory } from '@/api/category.api';
import CategoryUpdateModal from '@/app/panel/categories/_components/category-update-modal';

export const columns: ColumnDef<Category>[] = [
    {
        id: 'actions',
        meta: {
            label: 'Действия',
        },
        cell: ({ row }) => {
            return (
                <DataTableAction
                    deleteFetch={deleteCategory}
                    data={row.original}
                    id={row.original.id.toString()}
                    updateModal={<CategoryUpdateModal />}
                />
            );
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
