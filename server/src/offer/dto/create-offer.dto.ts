import { OfferStatus, OfferType, PriceType } from '@prisma/client';
import { IsIn, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';
import { IOfferStatus } from 'src/common/types/offer-status.type';
import { IOfferType } from 'src/common/types/offer-type.type';
import { IPriceType } from 'src/common/types/price-type.type';
import { keys } from 'ts-transformer-keys';

export class CreateOfferDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 120)
    title: string;

    @IsNotEmpty()
    @IsString()
    @Length(10, 3000)
    description: string;

    @IsNotEmpty()
    @IsInt()
    price: number;

    @IsNotEmpty()
    @IsInt()
    type_id: number;

    @IsNotEmpty()
    @IsInt()
    region_id: number;

    @IsNotEmpty()
    @IsIn(keys<IOfferStatus>())
    status: OfferStatus;

    @IsNotEmpty()
    @IsIn(keys<IPriceType>())
    price_type: PriceType;

    @IsNotEmpty()
    @IsIn(keys<IOfferType>())
    type: OfferType;
}
