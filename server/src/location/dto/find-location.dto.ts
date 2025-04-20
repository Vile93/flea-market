import { Optional } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IsNumber, IsPositive } from 'class-validator';

export class FindLocationDto {
    /*   @Optional()
    @IsNumber()
    @IsPositive() */
    @Optional()
    @IsNumber()
    @IsPositive()
    skip?: number;
    /*     @Optional()
    @IsNumber()
    @IsPositive() */
    take?: number;
    cursor?: Prisma.LocationWhereUniqueInput;
    where?: Prisma.LocationWhereInput;
    orderBy?: Prisma.LocationOrderByWithRelationInput;
}
