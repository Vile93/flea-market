import { OfferStatus } from '@prisma/client';
import { IsIn, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';
import { IOfferStatus } from 'src/common/types/offer-status.inetrface';
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
}
