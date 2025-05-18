import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { BUCKET_NAMES, MAX_ALLOW_FILE_SIZE } from 'src/common/constants';
import { Payload } from 'src/common/types/payload.type';
import { OfferImagesRepositoryService } from 'src/offer-images/offer-images-repository.service';
import { OfferRepositoryService } from 'src/offer/offer-repository.service';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class OfferFilesService {
    constructor(
        private readonly offerImagesRepository: OfferImagesRepositoryService,
        private readonly offerRepository: OfferRepositoryService,
        private readonly storage: StorageService,
    ) {}

    async create(offerId: number, payload: Payload, files: { images?: Express.Multer.File[] }) {
        const offer = await this.offerRepository.find({ id: offerId }, {});
        if (!offer) {
            throw new NotFoundException();
        }
        if (payload.userId !== offer.user_id) {
            throw new ForbiddenException();
        }
        if (!files.images) return;
        for (const file of files.images) {
            if (file.size > MAX_ALLOW_FILE_SIZE) {
                throw new ForbiddenException();
            }
        }
        const fileUrls: string[] = [];
        for (const file of files.images) {
            const url = await this.storage.uploadFile(file, BUCKET_NAMES.TEMP_IMAGES, 'public-read');
            if (!url) {
                throw new BadRequestException();
            }
            fileUrls.push(url);
        }
    }
}
