import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationOptions,
    registerDecorator,
} from 'class-validator';
import { FindLocationDto } from 'src/location/dto/find-location.dto';

@ValidatorConstraint({ async: false })
export class IsOrderConstraint implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): boolean {
        const { orderDirection, orderField } = validationArguments?.object as FindLocationDto;
        if (typeof orderField === 'undefined' && typeof orderDirection === 'undefined') return true;
        if (typeof orderField !== 'string' || typeof orderDirection !== 'string') return false;
        return true;
    }
    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'Incorrect sort fields';
    }
}

export const IsOrder = (validateOptions?: ValidationOptions) => {
    return function (object: Function) {
        registerDecorator({
            target: object,
            propertyName: '',
            options: validateOptions,
            validator: IsOrderConstraint,
        });
    };
};
