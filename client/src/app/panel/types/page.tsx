import { serverGetPanelData } from '@/api/server-get-panel-data.api';
import TypeList from '@/app/panel/types/_components/type-list';
import { Type } from '@/types/type.interface';
import TypeAddModal from '@/app/panel/types/_components/type-add-modal';
import { TYPE_COLUMNS } from '@/constants/panel.constant';
import { columns } from '@/app/panel/types/_components/columns';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Типы',
    description: 'Типы',
};

export default async function Types() {
    const data = await serverGetPanelData<Type>('types');
    return (
        <TypeList
            data={data.data}
            addModal={<TypeAddModal />}
            columns={columns}
            constantsSearchField={TYPE_COLUMNS}
            totalCount={data.totalCount}
        />
    );
}
