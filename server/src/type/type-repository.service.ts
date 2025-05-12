import { Injectable } from '@nestjs/common';
import { Prisma, Type } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TypeRepositoryService {
    constructor(private readonly prisma: PrismaService) {}

    async count(where: Prisma.TypeWhereInput): Promise<number> {
        return this.prisma.type.count({ where });
    }
    async find(where: Prisma.TypeWhereUniqueInput): Promise<Type | null> {
        return this.prisma.type.findUnique({ where });
    }
    async findAll(params: {
        skip?: number;
        take?: number;
        where?: Prisma.TypeWhereInput;
        orderBy?: Prisma.TypeOrderByWithRelationInput;
    }): Promise<Type[]> {
        const { skip, take, where, orderBy } = params;
        return this.prisma.type.findMany({ skip, take, where, orderBy });
    }
    async create(data: Prisma.TypeCreateInput): Promise<Type> {
        return this.prisma.type.create({ data });
    }
    async update(params: { where: Prisma.TypeWhereUniqueInput; data: Prisma.TypeUpdateInput }): Promise<Type> {
        const { where, data } = params;
        return this.prisma.type.update({ where, data });
    }
    async delete(where: Prisma.TypeWhereUniqueInput): Promise<Type> {
        return this.prisma.type.delete({
            where,
        });
    }
}
