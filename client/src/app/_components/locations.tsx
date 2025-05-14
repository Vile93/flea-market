import { TreeDataItem, TreeView } from '@/components/tree-view';
import { Card, CardContent } from '@/components/ui/card';
import { CategoriesAndLocations } from '@/types/categories-locations.interface';

interface LocationsProps {
    data: CategoriesAndLocations;
}

export function Locations({ data }: LocationsProps) {
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
    return (
        <Card className={`bg-transparent my-2`}>
            <CardContent>
                <TreeView data={locations} onSelectChange={(e) => console.log(e)} />
            </CardContent>
        </Card>
    );
}
