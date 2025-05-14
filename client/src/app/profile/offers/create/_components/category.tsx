import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Category as ICategory } from '@/types/category.interface';
import { Type as IType } from '@/types/type.interface';

interface CategoryProps {
    category: string | null;
    categories: (ICategory & { Type: IType[] })[];
    setCategory: (category: string) => void;
    setListOfTypes: (types: IType[]) => void;
    setType: (type: string | null) => void;
}

export function Category({ category, categories, setCategory, setListOfTypes, setType }: CategoryProps) {
    const onChange = (value: string) => {
        const selectedCategory = categories.find((category) => category.id.toString() === value);
        setListOfTypes(selectedCategory?.Type ?? []);
        setCategory(value);
        setType(null);
    };
    return (
        <div className="flex flex-col gap-2">
            <Label className="text-lg">Категория</Label>
            <Select onValueChange={onChange} value={category ?? undefined}>
                <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Выберите локацию" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
