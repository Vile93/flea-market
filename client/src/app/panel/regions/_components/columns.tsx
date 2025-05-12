'use client';

import { deleteRegion } from '@/api/region.api';
import RegionUpdateModal from '@/app/panel/regions/_components/region-update-modal';
import DataTableAction from '@/components/table/data-table-action';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { Region } from '@/types/region.interface';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Region>[] = [
    {
        id: 'actions',
        meta: {
            label: 'Действия',
        },
        cell: ({ row }) => {
            return (
                <DataTableAction
                    deleteFetch={deleteRegion}
                    data={row.original}
                    id={row.original.id.toString()}
                    updateModal={<RegionUpdateModal />}
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
        meta: {
            label: 'Название',
        },
    },
    {
        accessorKey: 'location_id',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Локация" />;
        },
        meta: {
            label: 'Локация',
        },
    },
] as const;
