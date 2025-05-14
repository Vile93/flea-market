import { FormError } from '@/components/form-error';
import { Label } from '@/components/ui/label';

import { SelectContent, SelectValue, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';

import { Select } from '@/components/ui/select';
import { OfferType } from '@/types/offer-type.enum';
import { offerSchema } from '@/validators/offer.validator';
import { Control, Controller } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form';
import { z } from 'zod';

interface StateProps {
    errors: FieldErrors<z.infer<typeof offerSchema>>;
    control: Control<z.infer<typeof offerSchema>>;
}

export function State({ errors, control }: StateProps) {
    return (
        <div className="flex gap-2">
            <div className="flex flex-col gap-2">
                <Label className="text-lg">Состояние</Label>
                <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="cursor-pointer">
                                <SelectValue placeholder={field.value} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value={OfferType.NEW}>новое</SelectItem>
                                    <SelectItem value={OfferType.OLD}>б/у</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
                <FormError error={errors.type?.message} />
            </div>
        </div>
    );
}
