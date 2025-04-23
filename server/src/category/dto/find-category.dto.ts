import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { transformToNumber } from 'src/common/decorators/transformToNumber.decorator';

export class FindCategoryDto {
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
