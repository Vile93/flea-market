import { Injectable } from '@nestjs/common';
import { Prisma, Offer } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OfferRepositoryService {
    constructor(private readonly prisma: PrismaService) {}

    async count(where: Prisma.OfferWhereInput): Promise<number> {
        return this.prisma.offer.count({ where });
    }
    async find(where: Prisma.OfferWhereUniqueInput): Promise<Offer | null> {
        return this.prisma.offer.findUnique({ where });
    }
    async findAll(params: {
        skip?: number;
        take?: number;
        where?: Prisma.OfferWhereInput;
        orderBy?: Prisma.OfferOrderByWithRelationInput;
    }): Promise<Offer[]> {
        const { skip, take, where, orderBy } = params;
        return this.prisma.offer.findMany({ skip, take, where, orderBy });
    }
    async create(data: Prisma.OfferCreateInput): Promise<Offer> {
        return this.prisma.offer.create({ data });
    }
    async update(params: { where: Prisma.OfferWhereUniqueInput; data: Prisma.OfferUpdateInput }): Promise<Offer> {
        const { where, data } = params;
        return this.prisma.offer.update({ where, data });
    }
    async delete(where: Prisma.OfferWhereUniqueInput): Promise<Offer> {
        return this.prisma.offer.delete({
            where,
        });
    }
}
