import { Module } from '@nestjs/common';
import { OfferFilesService } from './offer-files.service';
import { OfferFilesController } from './offer-files.controller';
import { OfferModule } from 'src/offer/offer.module';
import { OfferImagesModule } from 'src/offer-images/offer-images.module';
import { StorageModule } from 'src/storage/storage.module';

@Module({
    imports: [OfferModule, OfferImagesModule, StorageModule],
    controllers: [OfferFilesController],
    providers: [OfferFilesService],
})
export class OfferFilesModule {}
