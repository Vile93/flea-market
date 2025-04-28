import { User } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsOptional, IsPositive, IsInt } from 'class-validator';
import { findDataOpts } from 'src/common/decorators/find-data-opts.decorator';
import { isOrder } from 'src/common/decorators/is-order.decorator';
import { isSearch } from 'src/common/decorators/is-search.decorator';
import { transformToNumber } from 'src/common/decorators/transform-to-number.decorator';
import { FindOpts } from 'src/common/types/find-opts.interface';
import { keys } from 'ts-transformer-keys';

@isOrder(keys<User>())
@isSearch(keys<User>())
export class FindUserDto {
    @IsOptional()
    @Expose()
    @findDataOpts()
    data: FindOpts;

    @IsOptional()
    @IsPositive()
    @IsInt()
    @transformToNumber()
    skip?: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    @transformToNumber()
    take?: number;

    @IsOptional()
    searchField?: string;
    @IsOptional()
    searchValue?: string;

    @IsOptional()
    orderField?: string;
    @IsOptional()
    orderDirection?: string;
}
