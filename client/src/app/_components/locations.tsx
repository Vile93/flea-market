import { TreeDataItem, TreeView } from '@/components/tree-view';
import { Card, CardContent } from '@/components/ui/card';
import { CategoriesAndLocations } from '@/types/categories-locations.interface';
import React from 'react';

interface LocationsProps {
    data: CategoriesAndLocations;
    setRegion: React.Dispatch<React.SetStateAction<{ id: string; value: string } | null>>;
    region: { id: string; value: string } | null;
}

export function Locations({ data, setRegion, region }: LocationsProps) {
    const locations: TreeDataItem[] = data.locations?.map((location) => ({
        id: 'Location' + location.id.toString(),
        name: location.name,
        payload: location.id,
        children: location.Region?.map((region) => ({
            id: 'Region' + region.id.toString(),
            name: region.name,
            payload: region.id,
        })),
    }));
    const onSelectChange = (item?: TreeDataItem) => {
        if (!item || item.id.startsWith('Location')) return;
        if (item.id === region?.id) {
            setRegion(null);
            return;
        }
        setRegion({ id: item.id, value: (item as TreeDataItem & { payload: string }).payload });
    };
    return (
        <Card className={`bg-transparent my-2`}>
            <CardContent>
                <TreeView data={locations} onSelectChange={onSelectChange} value={region?.id} />
            </CardContent>
        </Card>
    );
}
