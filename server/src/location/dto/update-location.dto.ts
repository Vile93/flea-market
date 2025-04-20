import { Optional } from '@nestjs/common';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateLocationDto {
    @Optional()
    @IsString()
    @MaxLength(50)
    @MinLength(3)
    name: string;
}
