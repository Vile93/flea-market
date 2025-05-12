'use client';

import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/types/user.interface';
import DataTableAction from '@/components/table/data-table-action';
import { deleteUser } from '@/api/user.api';
import UserUpdateModal from '@/app/panel/users/_components/user-update-modal';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';

export const columns: ColumnDef<User>[] = [
    {
        id: 'actions',
        meta: {
            label: 'Действия',
        },
        cell: ({ row }) => {
            return (
                <DataTableAction
                    id={row.original.id.toString()}
                    data={row.original}
                    updateModal={<UserUpdateModal />}
                    deleteFetch={deleteUser}
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
            return <DataTableColumnHeader column={column} title="Имя" />;
        },
        meta: { label: 'Имя' },
    },
    {
        accessorKey: 'surname',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Фамилия" />;
        },
        meta: { label: 'Фамилия' },
    },
    {
        accessorKey: 'username',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Логин" />;
        },
        meta: { label: 'Логин' },
    },
    {
        accessorKey: 'phone',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Телефон" />;
        },
        meta: { label: 'Телефон' },
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Почта" />;
        },
        meta: { label: 'Почта' },
    },
    {
        accessorKey: 'role',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Роль" />;
        },
        meta: { label: 'Роль' },
    },
    {
        accessorKey: 'is_verified',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Верифицирован" />;
        },
        meta: { label: 'Верифицирован' },
    },
    {
        accessorKey: 'avatar_path',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Путь к аватару" />;
        },
        meta: { label: 'Путь к аватару' },
    },
];
