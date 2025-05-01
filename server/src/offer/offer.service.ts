import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { OfferRepositoryService } from 'src/offer/offer-repository.service';
import { FindOfferDto } from 'src/offer/dto/find-offer.dto';
import { Payload } from 'src/common/types/payload.type';
import { Role } from '@prisma/client';
import { RegionRepositoryService } from 'src/region/region-repository.service';
import { TypeRepositoryService } from 'src/type/type-repository.service';

@Injectable()
export class OfferService {
    constructor(
        private readonly offerRepository: OfferRepositoryService,
        private readonly regionRepository: RegionRepositoryService,
        private readonly typeRepository: TypeRepositoryService,
    ) {}

    async create(createOfferDto: CreateOfferDto, payload: Payload) {
        const { description, price, region_id, title, type_id, price_type, type } = createOfferDto;
        const categoryType = await this.typeRepository.find({ id: type_id });
        if (!categoryType) {
            throw new NotFoundException();
        }
        const region = await this.regionRepository.find({ id: region_id });
        if (!region) {
            throw new NotFoundException();
        }
        return this.offerRepository.create({
            description,
            price,
            title,
            price_type,
            type,
            region_ref: { connect: { id: region_id } },
            user_ref: { connect: { id: payload.userId } },
            type_ref: { connect: { id: type_id } },
        });
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
}
