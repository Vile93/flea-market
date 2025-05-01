import { Injectable, NotFoundException } from '@nestjs/common';
import { Payload } from 'src/common/types/payload.type';
import { OfferRepositoryService } from 'src/offer/offer-repository.service';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { FindReviewDto } from 'src/review/dto/find-review-dto';
import { UpdateReviewDto } from 'src/review/dto/update-review.dto';
import { ReviewRepositoryService } from 'src/review/review-repository.service';

@Injectable()
export class ReviewService {
    constructor(
        private readonly reviewRepository: ReviewRepositoryService,
        private readonly offerRepository: OfferRepositoryService,
    ) {}

    async create(createReviewDto: CreateReviewDto, payload: Payload) {
        const { offer_id } = createReviewDto;
        const offer = await this.offerRepository.find({ id: offer_id });
        if (!offer) {
            throw new NotFoundException();
        }
    }
    async findById(id: number) {
        const review = await this.reviewRepository.find({ id });
        if (!review) {
            throw new NotFoundException();
        }
        return review;
    }
    async findAll(findReviewDto: FindReviewDto) {
        const { searchField } = findReviewDto;
        if (searchField) {
        }
        return this.reviewRepository.findAll(findReviewDto.data);
    }
    async delete(id: number) {
        const review = await this.reviewRepository.find({ id });
        if (!review) {
            throw new NotFoundException();
        }
        return this.reviewRepository.delete({ id });
    }
    async update(id: number, payload: Payload, updateReviewDto: UpdateReviewDto) {}
}
