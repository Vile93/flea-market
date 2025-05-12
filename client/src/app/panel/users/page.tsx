import { serverGetPanelData } from '@/api/server-get-panel-data.api';
import UserList from './_components/user-list';
import UserAddModal from './_components/user-add-modal';
import { columns } from './_components/columns';
import { USER_COLUMNS } from '@/constants/panel.constant';
import { User } from '@/types/user.interface';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { Roles } from '@/types/roles.enum';

export const metadata: Metadata = {
    title: 'Пользователи',
    description: 'Пользователи',
};

export default async function Users() {
    const headersList = await headers();
    const role = headersList.get('x-role');
    const data = await serverGetPanelData<User>('users');
    return (
        <UserList
            data={data.data}
            totalCount={data.totalCount}
            addModal={<UserAddModal />}
            columns={columns}
            constantsSearchField={USER_COLUMNS}
            isDisabledAddButton={role !== Roles.ROOT}
        />
    );
}
