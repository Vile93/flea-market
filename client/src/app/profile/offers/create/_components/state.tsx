import { Label } from '@/components/ui/label';

import { SelectContent, SelectValue, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';

import { Select } from '@/components/ui/select';
import { offerSchema } from '@/validators/offer.validator';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form';
import { z } from 'zod';

interface StateProps {
    register: UseFormRegister<z.infer<typeof offerSchema>>;
    errors: FieldErrors<FieldValues>;
    control: Control<z.infer<typeof offerSchema>>;
}

export function State({ register, errors, control }: StateProps) {
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
                                <SelectValue placeholder="новое" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="new">новое</SelectItem>
                                    <SelectItem value="old">б/у</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
            </div>
        </div>
    );
}
