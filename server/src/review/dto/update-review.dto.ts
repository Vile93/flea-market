import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {}
