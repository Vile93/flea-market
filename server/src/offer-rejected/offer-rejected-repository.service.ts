import { Injectable } from '@nestjs/common';
import { OfferRejected, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OfferRejectedRepositoryService {
    constructor(private readonly prisma: PrismaService) {}

    async count(where: Prisma.OfferRejectedWhereInput): Promise<number> {
        return this.prisma.offerRejected.count({ where });
    }
    async find(where: Prisma.OfferRejectedWhereUniqueInput): Promise<OfferRejected | null> {
        return this.prisma.offerRejected.findUnique({ where });
    }
    async findAll(params: {
        skip?: number;
        take?: number;
        where?: Prisma.OfferRejectedWhereInput;
        orderBy?: Prisma.OfferRejectedOrderByWithRelationInput;
    }): Promise<OfferRejected[]> {
        const { skip, take, where, orderBy } = params;
        return this.prisma.offerRejected.findMany({ skip, take, where, orderBy });
    }
    async create(data: Prisma.OfferRejectedCreateInput): Promise<OfferRejected> {
        return this.prisma.offerRejected.create({ data });
    }
    async update(params: {
        where: Prisma.OfferRejectedWhereUniqueInput;
        data: Prisma.OfferRejectedUpdateInput;
    }): Promise<OfferRejected> {
        const { where, data } = params;
        return this.prisma.offerRejected.update({ where, data });
    }
    async delete(where: Prisma.OfferRejectedWhereUniqueInput): Promise<OfferRejected> {
        return this.prisma.offerRejected.delete({
            where,
        });
    }
}
