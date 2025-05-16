import { FormError } from '@/components/form-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { offerSchema } from '@/validators/offer.validator';
import { UseFormRegister } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';
import { z } from 'zod';
interface TitleProps {
    register: UseFormRegister<z.infer<typeof offerSchema>>;
    errors: FieldErrors<FieldValues>;
}

export function Title({ register, errors }: TitleProps) {
    return (
        <div className="flex flex-col gap-2">
            <Label className="text-lg" htmlFor="title">
                Заголовок
            </Label>
            <Input required id="title" {...register('title')} />
            <FormError error={errors.title?.message as string} />
        </div>
    );
}
