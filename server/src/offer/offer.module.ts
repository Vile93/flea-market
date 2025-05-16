import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { OfferRepositoryService } from './offer-repository.service';
import { TypeModule } from 'src/type/type.module';
import { RegionModule } from 'src/region/region.module';
import { StorageModule } from 'src/storage/storage.module';
import { CategoryModule } from 'src/category/category.module';
import { LocationModule } from 'src/location/location.module';
import { OfferRejectedModule } from 'src/offer-rejected/offer-rejected.module';

@Module({
    exports: [OfferRepositoryService],
    imports: [TypeModule, RegionModule, StorageModule, CategoryModule, LocationModule, OfferRejectedModule],
    controllers: [OfferController],
    providers: [OfferService, OfferRepositoryService],
})
export class OfferModule {}
