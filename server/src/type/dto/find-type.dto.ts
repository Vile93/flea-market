import { Type } from '@prisma/client';
import { IsOptional, IsPositive, IsInt } from 'class-validator';
import { isOrder } from 'src/common/decorators/isOrder.decorator';
import { isSearch } from 'src/common/decorators/isSearch.decorator';
import { transformToNumber } from 'src/common/decorators/transformToNumber.decorator';
import { keys } from 'ts-transformer-keys';

@isOrder()
@isSearch(keys<Type>())
export class FindTypeDto {
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
