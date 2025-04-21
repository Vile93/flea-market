import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint()
export class SearchConstraint implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        const { searchField, searchValue } = validationArguments?.object as any;
        const fields = validationArguments?.constraints?.flat(1) as string[];
        if (typeof searchField === 'undefined' && typeof searchValue === 'undefined') return true;
        if (typeof searchField !== 'string' || typeof searchValue !== 'string') return false;
        if (!fields?.includes(searchField)) return false;
        return true;
    }
    defaultMessage(): string {
        return 'Incorrect search fields';
    }
}
