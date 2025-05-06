import { IsInt, IsNotEmpty, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTypeDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    category_id: number;
}
