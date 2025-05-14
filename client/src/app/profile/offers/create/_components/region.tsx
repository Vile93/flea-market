import { Label } from '@/components/ui/label';
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Select } from '@/components/ui/select';
import { Region as IRegion } from '@/types/region.interface';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { z } from 'zod';
import { offerSchema } from '@/validators/offer.validator';
import { FormError } from '@/components/form-error';

interface RegionProps {
    listOfRegions: IRegion[];
    errors: FieldErrors<z.infer<typeof offerSchema>>;
    control: Control<z.infer<typeof offerSchema>>;
}

export function Region({ listOfRegions, errors, control }: RegionProps) {
    return (
        <div className="flex flex-col gap-2">
            <Label className="text-lg">Регион</Label>
            <Controller
                name="region_id"
                control={control}
                render={({ field }) => (
                    <Select
                        onValueChange={field.onChange}
                        value={field.value ? field.value.toString() : ''}
                        disabled={!listOfRegions.length}
                    >
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
                )}
            />
            <FormError error={errors.region_id?.message} />
        </div>
    );
}
