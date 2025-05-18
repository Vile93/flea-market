import { Input } from '@/components/ui/input';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { offerSchema } from '@/validators/offer.validator';
import { FieldValues } from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form';
import { FormError } from '@/components/form-error';
import { z } from 'zod';
import { PriceType } from '@/types/price-type.enum';

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
                        defaultValue={field.value}
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
                                <SelectItem value={PriceType.PAY}>Платно</SelectItem>
                                <SelectItem value={PriceType.CONTRACT}>Договорная</SelectItem>
                                <SelectItem value={PriceType.FREE}>Бесплатно</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            />
            {typeOfPrice === PriceType.PAY ? (
                <>
                    <Input required id="price" type="number" placeholder="0.99" step={0.01} {...register('price')} />
                    <FormError error={errors.price?.message as string} />
                </>
            ) : null}
        </div>
    );
}
