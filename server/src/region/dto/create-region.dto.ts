import { IsNotEmpty, IsString, MinLength, MaxLength, IsInt } from 'class-validator';

export class CreateRegionDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @IsInt()
    location_id: number;
}
