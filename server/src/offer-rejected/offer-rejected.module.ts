import { Module } from '@nestjs/common';
import { OfferRejectedRepositoryService } from './offer-rejected-repository.service';

@Module({
    exports: [OfferRejectedRepositoryService],
    providers: [OfferRejectedRepositoryService],
})
export class OfferRejectedModule {}
