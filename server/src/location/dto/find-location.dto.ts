import { IsIn, IsNumber, IsOptional, IsPositive, Validate, validate } from 'class-validator';
import { IsOrder } from 'src/common/validators/order.validator';

@IsOrder()
export class FindLocationDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    skip?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    take: number;

    @IsIn([])
    searchField?: string;
    searchValue?: string;

    @IsOptional()
    orderField?: string;
    @IsOptional()
    orderDirection?: string;
}
