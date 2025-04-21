import { Optional } from '@nestjs/common';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateLocationDto {
    @Optional()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;
}
