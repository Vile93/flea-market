import { registerDecorator, ValidationOptions } from 'class-validator';
import { SearchConstraint } from 'src/common/validators/search.validator';

export const isSearch = (property: string[], validateOptions?: ValidationOptions) => {
    return function (object: Function) {
        registerDecorator({
            target: object,
            propertyName: '',
            options: validateOptions,
            constraints: property,
            validator: SearchConstraint,
        });
    };
};
