import { Label } from '@/components/ui/label';

import { SelectContent, SelectValue, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';

import { Select } from '@/components/ui/select';

export function State() {
    return (
        <div className="flex gap-2">
            <div className="flex flex-col gap-2">
                <Label className="text-lg">Состояние</Label>
                <Select>
                    <SelectTrigger className="cursor-pointer">
                        <SelectValue placeholder="новое" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="new">новое</SelectItem>
                            <SelectItem value="old">б/у</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
