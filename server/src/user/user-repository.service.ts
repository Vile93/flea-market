import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseRepository } from '../../../shared/interfaces/baseRepository.interface';

@Injectable()
export class UserRepositoryService
    implements
        BaseRepository<
            User,
            Prisma.UserWhereUniqueInput,
            Prisma.UserWhereInput,
            Prisma.UserCreateInput,
            Prisma.UserOrderByWithRelationInput
        >
{
    constructor(private prisma: PrismaService) {}

    async find(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
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

    async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        });
    }

    async update(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserCreateInput }) {
        const { where, data } = params;
        return this.prisma.user.update({
            where,
            data,
        });
    }
}
