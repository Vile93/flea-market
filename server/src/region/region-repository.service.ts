import { Injectable } from '@nestjs/common';
import { Prisma, Region } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegionRepositoryService {
    constructor(private readonly prisma: PrismaService) {}

    async find(where: Prisma.RegionWhereUniqueInput): Promise<Region | null> {
        return this.prisma.region.findUnique({ where });
    }
    async findAll(params: {
        skip?: number;
        take?: number;
        where?: Prisma.RegionWhereInput;
        orderBy?: Prisma.RegionOrderByWithRelationInput;
    }): Promise<Region[]> {
        const { skip, take, where, orderBy } = params;
        return this.prisma.region.findMany({ skip, take, where, orderBy });
    }
    async create(data: Prisma.RegionCreateInput): Promise<Region> {
        return this.prisma.region.create({ data });
    }
    async update(params: { where: Prisma.RegionWhereUniqueInput; data: Prisma.RegionUpdateInput }): Promise<Region> {
        const { where, data } = params;
        return this.prisma.region.update({ where, data });
    }
    async delete(where: Prisma.RegionWhereUniqueInput): Promise<Region> {
        return this.prisma.region.delete({
            where,
        });
    }
}
