import { OfferStatus } from '@prisma/client';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateModerateOfferDto {
    @IsNotEmpty()
    @IsIn([OfferStatus.ACCEPTED, OfferStatus.REJECTED])
    status: OfferStatus;

    @IsOptional()
    content?: string;
}
