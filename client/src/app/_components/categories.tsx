import { TreeDataItem, TreeView } from '@/components/tree-view';
import { Card, CardContent } from '@/components/ui/card';
import { CategoriesAndLocations } from '@/types/categories-locations.interface';

interface CategoriesProps {
    data: CategoriesAndLocations;
}

export function Categories({ data }: CategoriesProps) {
    const categories: TreeDataItem[] = data.categories?.map((category) => ({
        id: 'Category' + category.id.toString(),
        name: category.name,
        payload: category.id,
        children: category.Type?.map((type) => ({
            id: 'Type' + type.id.toString(),
            name: type.name,
            payload: type.id,
        })),
    }));
    return (
        <Card className={`bg-transparent`}>
            <CardContent>
                <TreeView defaultValue={'Category 1'} data={categories} onSelectChange={(e) => console.log(e)} />
            </CardContent>
        </Card>
    );
}
