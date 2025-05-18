'use client';

import DataTableActionOnModeration from '@/app/panel/offers-on-moderation/_components/data-table-action-on-moderation';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { OfferColumnModerate } from '@/types/offer.interface';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<OfferColumnModerate>[] = [
    {
        id: 'actions',
        meta: {
            label: 'Действия',
        },
        cell: ({ row }) => {
            return <DataTableActionOnModeration id={row.original.id.toString()} />;
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
        accessorKey: 'title',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Заголовок" />;
        },
        meta: {
            label: 'Заголовок',
        },
    },
    {
        accessorKey: 'user_id',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Айди пользователя" />;
        },
        meta: {
            label: 'Айди пользователя',
        },
    },
    {
        accessorKey: 'type',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Состояние продукта" />;
        },
        meta: {
            label: 'Состояние продукта',
        },
    },
    {
        accessorKey: 'price_type',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Тип цены" />;
        },
        meta: {
            label: 'Тип цены',
        },
    },
    {
        accessorKey: 'price',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Цена" />;
        },
        meta: {
            label: 'Цена',
        },
    },
    {
        accessorKey: 'region_name',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Название региона" />;
        },
        meta: {
            label: 'Название региона',
        },
    },
    {
        accessorKey: 'type_name',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Тип продукта" />;
        },
        meta: {
            label: 'Тип продукта',
        },
    },
];
