import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint()
export class OrderConstraint implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        const { orderDirection, orderField } = validationArguments?.object as any;
        if (typeof orderField === 'undefined' && typeof orderDirection === 'undefined') return true;
        if (typeof orderField !== 'string' || typeof orderDirection !== 'string') return false;
        return true;
    }
    defaultMessage(): string {
        return 'Incorrect sort fields';
    }
}
