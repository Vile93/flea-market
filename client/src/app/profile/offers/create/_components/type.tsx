import { SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';

import { SelectValue } from '@/components/ui/select';

import { Label } from '@/components/ui/label';
import { Select, SelectTrigger } from '@/components/ui/select';
import { Type as IType } from '@/types/type.interface';

interface TypeProps {
    type: string | null;
    listOfTypes: IType[];
    setType: (type: string) => void;
}

export function Type({ type, listOfTypes, setType }: TypeProps) {
    console.log(type);
    return (
        <div className="flex flex-col gap-2">
            <Label className="text-lg">Тип</Label>
            <Select onValueChange={setType} value={type ?? ''}>
                <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {listOfTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id.toString()}>
                                {type.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
