import { IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

export class CreateReviewDto {
    @IsNotEmpty()
    @IsInt()
    user_id: number;

    @IsNotEmpty()
    @IsInt()
    offer_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @IsOptional()
    @Max(400)
    content?: string;
}
