import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { OfferRepositoryService } from 'src/offer/offer-repository.service';
import { FindOfferDto } from 'src/offer/dto/find-offer.dto';
import { Payload } from 'src/common/types/payload.type';
import { Role } from '@prisma/client';
import { RegionRepositoryService } from 'src/region/region-repository.service';
import { TypeRepositoryService } from 'src/type/type-repository.service';
import { StorageService } from 'src/storage/storage.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BUCKET_NAMES } from 'src/common/constants';
import { CategoryRepositoryService } from 'src/category/category-repository.service';
import { LocationRepositoryService } from 'src/location/location-repository.service';

@Injectable()
export class OfferService {
    constructor(
        private readonly offerRepository: OfferRepositoryService,
        private readonly regionRepository: RegionRepositoryService,
        private readonly typeRepository: TypeRepositoryService,
        private readonly storageService: StorageService,
        private readonly categoryRepository: CategoryRepositoryService,
        private readonly locationRepository: LocationRepositoryService,
        private readonly prisma: PrismaService,
    ) {}

    async findCategoriesAndLocations() {
        const categories = await this.categoryRepository.findAll({
            include: {
                Type: true,
            },
        });
        const locations = await this.locationRepository.findAll({
            include: {
                Region: true,
            },
        });
        return { categories, locations };
    }

    async create(createOfferDto: CreateOfferDto, payload: Payload) {
        const { description, price, region_id, title, type_id, price_type, type, imagesLinks } = createOfferDto;
        const categoryType = await this.typeRepository.find({ id: type_id });
        if (!categoryType) {
            throw new NotFoundException();
        }
        const region = await this.regionRepository.find({ id: region_id });
        if (!region) {
            throw new NotFoundException();
        }
        try {
            const offer = await this.prisma.$transaction(async (tx) => {
                const offer = await tx.offer.create({
                    data: {
                        description,
                        price,
                        title,
                        price_type,
                        type,
                        region_ref: { connect: { id: region_id } },
                        user_ref: { connect: { id: +payload.userId } },
                        type_ref: { connect: { id: type_id } },
                    },
                });
                for (let i = 0; i < imagesLinks.length; i++) {
                    const image = await this.storageService.getFile(imagesLinks[i], BUCKET_NAMES.TEMP_IMAGES);
                    if (!image) {
                        throw new BadRequestException();
                    }
                    const link = await this.storageService.uploadFile(image, BUCKET_NAMES.OFFER_IMAGES, 'public-read');

                    if (!link) {
                        throw new BadRequestException();
                    }
                    await tx.offerImages.create({
                        data: {
                            link,
                            order: i,
                            offer_ref: { connect: { id: offer.id } },
                        },
                    });
                }
                return offer;
            });
            return offer;
        } catch (err) {
            console.log(err);
            throw new BadRequestException();
        }
    }

    async findAll(findOfferDto: FindOfferDto) {
        return this.offerRepository.findAll(findOfferDto);
    }

    async findById(id: number) {
        const offer = await this.offerRepository.find({ id });
        if (!offer) {
            throw new NotFoundException();
        }
        return offer;
    }

    async update(id: number, payload: Payload, updateOfferDto: UpdateOfferDto) {
        const offer = await this.offerRepository.find({ id });
        if (!offer) {
            throw new NotFoundException();
        }
        if (payload.role === Role.ROOT || payload.role === Role.ADMIN) {
            return this.offerRepository.update({ where: { id }, data: updateOfferDto });
        }
        if (offer.user_id === payload.userId) {
            return this.offerRepository.update({ where: { id }, data: updateOfferDto });
        }
        throw new ForbiddenException();
    }

    async delete(id: number, payload: Payload) {
        const offer = await this.offerRepository.find({ id });
        if (!offer) {
            throw new NotFoundException();
        }
        if (payload.role === Role.ROOT || payload.role === Role.ADMIN) {
            return this.offerRepository.delete({ id });
        }
        if (offer.user_id === payload.userId) {
            return this.offerRepository.delete({ id });
        }
        throw new ForbiddenException();
    }

    async createImage(image: Express.Multer.File) {
        const url = await this.storageService.uploadFile(image, BUCKET_NAMES.TEMP_IMAGES, 'public-read');
        return { url };
    }
}
