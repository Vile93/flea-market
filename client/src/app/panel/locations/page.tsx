import { serverGetPanelData } from '@/api/server-get-panel-data.api';
import LocationList from '@/app/panel/locations/_components/location-list';
import { columns } from '@/app/panel/locations/_components/columns';
import { LOCATION_COLUMNS } from '@/constants/panel.constant';
import LocationAddModal from '@/app/panel/locations/_components/location-add-modal';
import { Location } from '@/types/location.interface';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Локации',
    description: 'Локации',
};

export default async function Locations() {
    const data = await serverGetPanelData<Location>('locations');
    return (
        <LocationList
            data={data.data}
            totalCount={data.totalCount}
            columns={columns}
            constantsSearchField={LOCATION_COLUMNS}
            addModal={<LocationAddModal />}
        />
    );
}
