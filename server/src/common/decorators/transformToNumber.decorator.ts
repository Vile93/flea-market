import { Transform } from 'class-transformer';

export const transformToNumber = () => {
    return Transform(({ value }) => {
        return +value;
    });
};
