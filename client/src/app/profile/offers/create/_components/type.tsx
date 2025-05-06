import { SelectContent, SelectGroup } from '@/components/ui/select';

import { SelectValue } from '@/components/ui/select';

import { Label } from '@/components/ui/label';
import { Select, SelectTrigger } from '@/components/ui/select';

export function Type() {
    return (
        <div className="flex flex-col gap-2">
            <Label className="text-lg">Тип</Label>
            <Select>
                <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Выберите локацию" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>{/*  <SelectItem value="price">Минск</SelectItem> */}</SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
