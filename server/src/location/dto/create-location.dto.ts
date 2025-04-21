import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateLocationDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;
}
