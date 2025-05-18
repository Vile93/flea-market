'use client';

import DataTableAction from '@/components/table/data-table-action';
import { deleteLocation } from '@/api/location.api';
import { ColumnDef } from '@tanstack/react-table';
import { Location } from '@/types/location.interface';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import LocationUpdateModal from '@/app/panel/locations/_components/location-update-modal';

export const columns: ColumnDef<Location>[] = [
    {
        id: 'actions',
        meta: {
            label: 'Действия',
        },
        cell: ({ row }) => {
            return (
                <DataTableAction
                    deleteFetch={deleteLocation}
                    data={row.original}
                    id={row.original.id.toString()}
                    updateModal={<LocationUpdateModal />}
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
];
