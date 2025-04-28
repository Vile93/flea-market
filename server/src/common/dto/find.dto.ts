import { Expose } from 'class-transformer';
import { IsOptional, IsPositive, IsInt } from 'class-validator';
import { findDataOpts } from 'src/common/decorators/find-data-opts.decorator';
import { transformToNumber } from 'src/common/decorators/transform-to-number.decorator';
import { FindOpts } from 'src/common/types/find-opts.interface';

export class FindDto {
    @IsOptional()
    @Expose()
    @findDataOpts()
    data: FindOpts;

    @IsOptional()
    @IsInt()
    @IsPositive()
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
