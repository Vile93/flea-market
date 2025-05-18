import { OfferType, Offer } from '@prisma/client';
import { Length, IsInt, IsIn, IsOptional, IsPositive, Min } from 'class-validator';
import { isOrder } from 'src/common/decorators/is-order.decorator';
import { transformToNumber } from 'src/common/decorators/transform-to-number.decorator';
import { IOfferType } from 'src/common/types/offer-type.type';
import { keys } from 'ts-transformer-keys';

@isOrder(keys<Pick<Offer, 'createdAt' | 'price'>>())
export class FindOfferDto {
    @IsOptional()
    @Length(0, 150)
    search?: string;

    @IsOptional()
    @IsPositive()
    @transformToNumber()
    priceFrom?: number;

    @IsOptional()
    @IsPositive()
    @transformToNumber()
    priceTo?: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    @transformToNumber()
    type_id?: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    @transformToNumber()
    region_id?: number;

    @IsOptional()
    @IsIn(keys<IOfferType>())
    type?: OfferType;

    @IsOptional()
    @IsInt()
    @Min(0)
    @transformToNumber()
    skip?: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    @transformToNumber()
    take?: number;

    @IsOptional()
    orderField?: string;
    @IsOptional()
    orderDirection?: string;
}
