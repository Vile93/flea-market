import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { OfferRepositoryService } from './offer-repository.service';
import { TypeModule } from 'src/type/type.module';
import { RegionModule } from 'src/region/region.module';

@Module({
    exports: [OfferRepositoryService],
    imports: [TypeModule, RegionModule],
    controllers: [OfferController],
    providers: [OfferService, OfferRepositoryService],
})
export class OfferModule {}
