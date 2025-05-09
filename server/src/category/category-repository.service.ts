import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryRepositoryService {
    constructor(private readonly prisma: PrismaService) {}

    async count(where: Prisma.CategoryWhereInput): Promise<number> {
        return this.prisma.category.count({ where });
    }
    async find(where: Prisma.CategoryWhereUniqueInput): Promise<Category | null> {
        return this.prisma.category.findUnique({ where });
    }
    async findAll(params: {
        skip?: number;
        take?: number;
        where?: Prisma.CategoryWhereInput;
        orderBy?: Prisma.CategoryOrderByWithRelationInput;
    }): Promise<Category[]> {
        const { skip, take, where, orderBy } = params;
        return this.prisma.category.findMany({ skip, take, where, orderBy });
    }
    async create(data: Prisma.CategoryCreateInput): Promise<Category> {
        return this.prisma.category.create({ data });
    }
    async update(params: {
        where: Prisma.CategoryWhereUniqueInput;
        data: Prisma.CategoryUpdateInput;
    }): Promise<Category> {
        const { where, data } = params;
        return this.prisma.category.update({ where, data });
    }
    async delete(where: Prisma.CategoryWhereUniqueInput): Promise<Category> {
        return this.prisma.category.delete({
            where,
        });
    }
}
