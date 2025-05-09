import { Transform } from 'class-transformer';
import { toObj } from 'src/common/utils/to-obj.utils';

export const findDataOpts = () => {
    return Transform((params) => {
        delete params.obj.data;
        const { skip, take, typeOfSearchField } = params.obj;
        let searchValue: string | number | boolean = params.obj.searchValue;
        if (typeOfSearchField === 'number') {
            searchValue = Number(searchValue);
        }
        if (typeOfSearchField === 'boolean') {
            searchValue = searchValue === 'true';
        }
        return toObj({
            orderBy: { [params.obj.orderField]: params.obj.orderDirection },
            where: { [params.obj.searchField]: searchValue },
            skip: !isNaN(Number(skip)) ? Number(skip) : undefined,
            take: !isNaN(Number(take)) ? Number(take) : undefined,
        });
    });
};
