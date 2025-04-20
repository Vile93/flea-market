import { Injectable } from '@nestjs/common';
import { Location, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LocationRepositoryService {
    constructor(private readonly prisma: PrismaService) {}

    async find(where: Prisma.LocationWhereUniqueInput): Promise<Location | null> {
        return this.prisma.location.findUnique({ where });
    }
    async findAll(params: {
        skip?: number;
        take?: number;
        where?: Prisma.LocationWhereInput;
        orderBy?: Prisma.LocationOrderByWithRelationInput;
    }): Promise<Location[]> {
        const { skip, take, where, orderBy } = params;
        return this.prisma.location.findMany({ skip, take, where, orderBy });
    }
    async create(data: Prisma.LocationCreateInput): Promise<Location> {
        return this.prisma.location.create({ data });
    }
    async update(params: {
        where: Prisma.LocationWhereUniqueInput;
        data: Prisma.LocationUpdateInput;
    }): Promise<Location> {
        const { where, data } = params;
        return this.prisma.location.update({ where, data });
    }
    async delete(where: Prisma.LocationWhereUniqueInput): Promise<Location> {
        return this.prisma.location.delete({
            where,
        });
    }
}
