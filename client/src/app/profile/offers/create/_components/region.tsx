import { Label } from '@/components/ui/label';
import { SelectContent, SelectGroup, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Select } from '@/components/ui/select';

export function Region() {
    return (
        <div className="flex flex-col gap-2">
            <Label className="text-lg">Регион</Label>
            <Select>
                <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Выберите регион" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>{/*  <SelectItem value="price">Минск</SelectItem> */}</SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
