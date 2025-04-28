import { Transform } from 'class-transformer';
import { FindOpts } from 'src/common/types/find-opts.interface';
import { toObj } from 'src/common/utils/to-obj.utils';

export const findDataOpts = () => {
    return Transform((params) => {
        delete params.obj.data;
        const { skip, take } = params.obj as FindOpts;
        return toObj({
            ...params.obj,
            skip: !isNaN(Number(skip)) ? Number(skip) : undefined,
            take: !isNaN(Number(take)) ? Number(take) : undefined,
        });
    });
};
