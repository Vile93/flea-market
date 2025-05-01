import { Module } from '@nestjs/common';
import { OfferImagesRepositoryService } from './offer-images-repository.service';

@Module({
    exports: [OfferImagesRepositoryService],
    controllers: [],
    providers: [OfferImagesRepositoryService],
})
export class OfferImagesModule {}
