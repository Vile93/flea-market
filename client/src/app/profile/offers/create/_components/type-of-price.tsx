import { Input } from '@/components/ui/input';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { offerSchema } from '@/validators/offer.validator';
import { FieldValues } from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form';
import { FormError } from '@/components/form-error';
import { z } from 'zod';

interface TypeOfPriceProps {
    typeOfPrice: string | null;
    setTypeOfPrice: (value: string) => void;
    register: UseFormRegister<z.infer<typeof offerSchema>>;
    errors: FieldErrors<FieldValues>;
    control: Control<z.infer<typeof offerSchema>>;
}

export function TypeOfPrice({ typeOfPrice, setTypeOfPrice, register, errors, control }: TypeOfPriceProps) {
    return (
        <div className="flex flex-col gap-2">
            <Label className="text-lg">Тип цены</Label>
            <Controller
                control={control}
                name="price_type"
                render={({ field }) => (
                    <Select
                        defaultValue="price"
                        onValueChange={(value) => {
                            field.onChange(value);
                            setTypeOfPrice(value);
                        }}
                    >
                        <SelectTrigger className="cursor-pointer">
                            <SelectValue placeholder="Цена" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="price">Платно</SelectItem>
                                <SelectItem value="contract">Договорная</SelectItem>
                                <SelectItem value="free">Бесплатно</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            />
            {typeOfPrice === 'price' ? (
                <>
                    <Input id="price" type="number" placeholder="0.99" {...register('price')} />
                    <FormError error={errors.price?.message as string} />
                </>
            ) : null}
        </div>
    );
}
