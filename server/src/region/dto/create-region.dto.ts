import { IsNotEmpty, IsString, MinLength, MaxLength, IsInt, IsPositive } from 'class-validator';

export class CreateRegionDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    location_id: number;
}
