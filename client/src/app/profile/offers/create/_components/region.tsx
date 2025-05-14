import { Label } from '@/components/ui/label';
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Select } from '@/components/ui/select';
import { Region as IRegion } from '@/types/region.interface';

interface RegionProps {
    region: string | null;
    listOfRegions: IRegion[];
    setRegion: (region: string) => void;
}

export function Region({ region, listOfRegions, setRegion }: RegionProps) {
    return (
        <div className="flex flex-col gap-2">
            <Label className="text-lg">Регион</Label>
            <Select onValueChange={setRegion} value={region ?? ''}>
                <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Выберите регион" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {listOfRegions.map((region) => (
                            <SelectItem key={region.id} value={region.id.toString()}>
                                {region.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
