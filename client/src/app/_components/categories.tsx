import { TreeDataItem, TreeView } from '@/components/tree-view';
import { Card, CardContent } from '@/components/ui/card';
import { CategoriesAndLocations } from '@/types/categories-locations.interface';

interface CategoriesProps {
    data: CategoriesAndLocations;
    setType: React.Dispatch<React.SetStateAction<{ id: string; value: string } | null>>;
    type: { id: string; value: string } | null;
}

export function Categories({ data, setType, type }: CategoriesProps) {
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
    const onSelectChange = (item?: TreeDataItem) => {
        if (!item || item.id.startsWith('Category')) return;
        if (item.id === type?.id) {
            setType(null);
            return;
        }
        setType({ id: item.id, value: (item as TreeDataItem & { payload: string }).payload });
    };
    return (
        <Card className={`bg-transparent`}>
            <CardContent>
                <TreeView data={categories} onSelectChange={onSelectChange} value={type?.id} />
            </CardContent>
        </Card>
    );
}
