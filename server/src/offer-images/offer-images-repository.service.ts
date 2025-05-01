import { Injectable } from '@nestjs/common';
import { Prisma, OfferImages } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OfferImagesRepositoryService {
    constructor(private readonly prisma: PrismaService) {}

    async find(where: Prisma.OfferImagesWhereUniqueInput): Promise<OfferImages | null> {
        return this.prisma.offerImages.findUnique({ where });
    }
    async findAll(params: {
        skip?: number;
        take?: number;
        where?: Prisma.OfferImagesWhereInput;
        orderBy?: Prisma.OfferImagesOrderByWithRelationInput;
    }): Promise<OfferImages[]> {
        const { skip, take, where, orderBy } = params;
        return this.prisma.offerImages.findMany({ skip, take, where, orderBy });
    }
    async create(data: Prisma.OfferImagesCreateInput): Promise<OfferImages> {
        return this.prisma.offerImages.create({ data });
    }
    async update(params: {
        where: Prisma.OfferImagesWhereUniqueInput;
        data: Prisma.OfferImagesUpdateInput;
    }): Promise<OfferImages> {
        const { where, data } = params;
        return this.prisma.offerImages.update({ where, data });
    }
    async delete(where: Prisma.OfferImagesWhereUniqueInput): Promise<OfferImages> {
        return this.prisma.offerImages.delete({
            where,
        });
    }
}
