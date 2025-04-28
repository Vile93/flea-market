import { registerDecorator, ValidationOptions } from 'class-validator';
import { OrderConstraint } from 'src/common/validators/order.validator';

export const isOrder = (property: string[], validateOptions?: ValidationOptions) => {
    return function (object: Function) {
        registerDecorator({
            target: object,
            propertyName: '',
            options: validateOptions,
            constraints: property,
            validator: OrderConstraint,
        });
    };
};
