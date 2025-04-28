import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepositoryService {
    constructor(private readonly prisma: PrismaService) {}

    async find(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
        return this.prisma.user.findUnique({
            where,
        });
    }
    async findAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.user.findMany({ skip, take, cursor, where, orderBy });
    }
    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({ data });
    }
    async update(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }) {
        const { where, data } = params;
        return this.prisma.user.update({
            where,
            data,
        });
    }
    async delete(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
        return this.prisma.user.delete({
            where,
        });
    }
    async findByLogin(login: string): Promise<User | null> {
        return this.prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email: login,
                    },
                    {
                        phone: login,
                    },
                    {
                        username: login,
                    },
                ],
            },
        });
    }
    async findFirst(where: Prisma.UserWhereInput): Promise<User | null> {
        return this.prisma.user.findFirst({ where });
    }
}
