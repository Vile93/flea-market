import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewRepositoryService } from './review-repository.service';
import { OfferModule } from 'src/offer/offer.module';

@Module({
    imports: [OfferModule],
    controllers: [ReviewController],
    providers: [ReviewService, ReviewRepositoryService],
})
export class ReviewModule {}
