import { Location } from '@prisma/client';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { isOrder } from 'src/common/decorators/isOrder.decorator';
import { isSearch } from 'src/common/decorators/isSearch.decorator';
import { transformToNumber } from 'src/common/decorators/transformToNumber.decorator';
import { keys } from 'ts-transformer-keys';

@isOrder()
@isSearch(keys<Location>())
export class FindLocationDto {
    @IsOptional()
    @IsPositive()
    @IsNumber()
    @transformToNumber()
    skip?: number;

    @IsOptional()
    @IsNumber()
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
