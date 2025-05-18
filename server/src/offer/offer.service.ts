import { BadRequestException, ForbiddenException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { OfferRepositoryService } from 'src/offer/offer-repository.service';
import { FindOfferDto } from 'src/offer/dto/find-offer.dto';
import { Payload } from 'src/common/types/payload.type';
import { OfferStatus, Role } from '@prisma/client';
import { RegionRepositoryService } from 'src/region/region-repository.service';
import { TypeRepositoryService } from 'src/type/type-repository.service';
import { StorageService } from 'src/storage/storage.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BUCKET_NAMES } from 'src/common/constants';
import { CategoryRepositoryService } from 'src/category/category-repository.service';
import { LocationRepositoryService } from 'src/location/location-repository.service';
import { FindOpts } from 'src/common/types/find-opts.interface';
import { UpdateModerateOfferDto } from 'src/offer/dto/update-moderate-offer.dto';
import { toObj } from 'src/common/utils/to-obj.utils';

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

    async findAllWithModerate(findOpts: FindOpts) {
        const totalCount = await this.offerRepository.count(findOpts.where ?? {});
        console.log(findOpts);
        const offers = await this.offerRepository.findAll({
            ...findOpts,
            where: {
                ...findOpts.where,
                status: OfferStatus.MODERATE,
            },
            include: {
                region_ref: true,
                type_ref: true,
            },
        });
        return {
            data: offers,
            totalCount,
        };
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
                        price: price || 0,
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

    async findAll(@Query() findOfferDto: FindOfferDto) {
        const { priceFrom, priceTo, orderDirection, orderField, region_id, type_id, search, skip, take, type } =
            findOfferDto;
        console.log(skip, take, type, 'skip and take');
        const totalCount = await this.offerRepository.count(
            toObj({
                OR: [
                    {
                        title: { contains: search || '', mode: 'insensitive' },
                    },
                    { description: { contains: search || '', mode: 'insensitive' } },
                ],
                status: OfferStatus.ACCEPTED,
                price: {
                    gte: priceFrom,
                    lte: priceTo,
                },
                region_id,
                type_id,
                type,
            }),
        );
        const offers = await this.offerRepository.findAll(
            toObj({
                where: {
                    OR: [
                        {
                            title: { contains: search || '', mode: 'insensitive' },
                        },
                        { description: { contains: search || '', mode: 'insensitive' } },
                    ],
                    status: OfferStatus.ACCEPTED,
                    price: {
                        gte: priceFrom,
                        lte: priceTo,
                    },
                    region_id,
                    type_id,
                    type,
                },
                include: {
                    OfferImages: true,
                    region_ref: true,
                    type_ref: true,
                },
                orderBy: { [orderField as string]: orderDirection },
                skip,
                take,
            }),
        );
        return {
            totalCount,
            data: offers,
        };
    }

    async findById(id: number) {
        const offer = await this.offerRepository.find(
            { id },
            {
                OfferImages: true,
                region_ref: true,
                type_ref: true,
                user_ref: { select: { username: true, phone: true, avatar_path: true } },
            },
        );
        if (!offer) {
            throw new NotFoundException();
        }

        if (offer.status !== OfferStatus.ACCEPTED) {
            throw new NotFoundException();
        }
        return offer;
    }

    async findByIdModerateOffer(id: number, payload: Payload) {
        if (payload.role !== Role.MODERATOR) {
            throw new ForbiddenException();
        }
        const offer = await this.offerRepository.find({ id }, { region_ref: true, type_ref: true, OfferImages: true });
        if (!offer || offer.status !== OfferStatus.MODERATE) {
            throw new NotFoundException();
        }
        return offer;
    }

    async updateModerateOffer(id: number, updateModerateOffer: UpdateModerateOfferDto) {
        const offer = await this.offerRepository.find({ id }, {});
        if (!offer || offer.status !== OfferStatus.MODERATE) {
            throw new NotFoundException();
        }
        try {
            const { content, status } = updateModerateOffer;
            const updatedOffer = await this.prisma.$transaction(async (tx) => {
                const updatedOffer = await tx.offer.update({ where: { id }, data: { status } });
                if (content && status === OfferStatus.REJECTED) {
                    await tx.offerRejected.create({ data: { content, offer_id: updatedOffer.id } });
                }
                return updatedOffer;
            });
            return updatedOffer;
        } catch (err) {
            console.log(err);
            throw new BadRequestException();
        }
    }

    async update(id: number, payload: Payload, updateOfferDto: UpdateOfferDto) {
        const offer = await this.offerRepository.find({ id }, {});
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
        const offer = await this.offerRepository.find({ id }, {});
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
