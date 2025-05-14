import { SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';

import { SelectValue } from '@/components/ui/select';

import { Label } from '@/components/ui/label';
import { Select, SelectTrigger } from '@/components/ui/select';
import { Type as IType } from '@/types/type.interface';
import { FormError } from '@/components/form-error';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { z } from 'zod';
import { offerSchema } from '@/validators/offer.validator';

interface TypeProps {
    listOfTypes: IType[];
    errors: FieldErrors<z.infer<typeof offerSchema>>;
    control: Control<z.infer<typeof offerSchema>>;
}

export function Type({ listOfTypes, errors, control }: TypeProps) {
    return (
        <div className="flex flex-col gap-2">
            <Label className="text-lg">Тип</Label>
            <Controller
                name="type_id"
                control={control}
                render={({ field }) => (
                    <Select
                        onValueChange={field.onChange}
                        value={field.value ? field.value.toString() : ''}
                        disabled={!listOfTypes.length}
                    >
                        <SelectTrigger className="cursor-pointer">
                            <SelectValue placeholder="Выберите тип" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {listOfTypes.map((type) => (
                                    <SelectItem key={type.id} value={type.id?.toString()}>
                                        {type.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            />
            <FormError error={errors.type_id?.message} />
        </div>
    );
}
