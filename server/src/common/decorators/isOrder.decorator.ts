import { registerDecorator, ValidationOptions } from 'class-validator';
import { OrderConstraint } from 'src/common/validators/order.validator';

export const isOrder = (validateOptions?: ValidationOptions) => {
    console.log(validateOptions);
    return function (object: Function) {
        registerDecorator({
            target: object,
            propertyName: '',
            options: validateOptions,
            validator: OrderConstraint,
        });
    };
};
