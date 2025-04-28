import { Injectable } from '@nestjs/common';
import { Prisma, Review } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewRepositoryService {
    constructor(private readonly prisma: PrismaService) {}

    async find(where: Prisma.ReviewWhereUniqueInput): Promise<Review | null> {
        return this.prisma.review.findUnique({ where });
    }
    async findAll(params: {
        skip?: number;
        take?: number;
        where?: Prisma.ReviewWhereInput;
        orderBy?: Prisma.ReviewOrderByWithRelationInput;
    }): Promise<Review[]> {
        const { skip, take, where, orderBy } = params;
        return this.prisma.review.findMany({ skip, take, where, orderBy });
    }
    async create(data: Prisma.ReviewCreateInput): Promise<Review> {
        return this.prisma.review.create({ data });
    }
    async update(params: { where: Prisma.ReviewWhereUniqueInput; data: Prisma.ReviewUpdateInput }): Promise<Review> {
        const { where, data } = params;
        return this.prisma.review.update({ where, data });
    }
    async delete(where: Prisma.ReviewWhereUniqueInput): Promise<Review> {
        return this.prisma.review.delete({
            where,
        });
    }
}
