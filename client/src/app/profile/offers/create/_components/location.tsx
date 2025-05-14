import { SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { SelectTrigger, SelectValue } from '@/components/ui/select';
import { Select } from '@/components/ui/select';
import { Location as ILocation } from '@/types/location.interface';
import { Region as IRegion } from '@/types/region.interface';

interface LocationProps {
    location: string | null;
    locations: (ILocation & { Region: IRegion[] })[];
    setLocation: (location: string) => void;
    setListOfRegions: (regions: IRegion[]) => void;
}

export function Location({ location, locations, setLocation, setListOfRegions }: LocationProps) {
    const onChange = (value: string) => {
        const selectedLocation = locations.find((location) => location.id.toString() === value);
        setListOfRegions(selectedLocation?.Region ?? []);
        setLocation(value);
    };
    return (
        <div className="flex flex-col gap-2">
            <Label className="text-lg">Локация</Label>
            <Select onValueChange={onChange} value={location ?? ''}>
                <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Выберите локацию" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {locations.map((location) => (
                            <SelectItem key={location.id} value={location.id.toString()}>
                                {location.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
