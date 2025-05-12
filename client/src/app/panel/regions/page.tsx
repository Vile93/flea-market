import { serverGetPanelData } from '@/api/server-get-panel-data.api';
import { columns } from '@/app/panel/regions/_components/columns';
import RegionAddModal from '@/app/panel/regions/_components/region-add-modal';
import RegionList from '@/app/panel/regions/_components/region-list';
import { REGION_COLUMNS } from '@/constants/panel.constant';
import { Region } from '@/types/region.interface';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Регионы',
    description: 'Регионы',
};

export default async function Regions() {
    const data = await serverGetPanelData<Region>('regions');
    return (
        <RegionList
            data={data.data}
            totalCount={data.totalCount}
            columns={columns}
            constantsSearchField={REGION_COLUMNS}
            addModal={<RegionAddModal />}
        />
    );
}
