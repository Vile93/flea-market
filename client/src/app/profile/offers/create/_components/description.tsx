import { FormError } from '@/components/form-error';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { offerSchema } from '@/validators/offer.validator';
import { FieldValues } from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form';
import { z } from 'zod';

interface DescriptionProps {
    register: UseFormRegister<z.infer<typeof offerSchema>>;
    errors: FieldErrors<FieldValues>;
}

export function Description({ register, errors }: DescriptionProps) {
    return (
        <div className="flex flex-col gap-2">
            <Label className="text-lg" htmlFor="description">
                Описание
            </Label>
            <Textarea required id="description" {...register('description')} />
            <FormError error={errors.description?.message as string} />
        </div>
    );
}
