import { Injectable } from '@nestjs/common';
import { Jwt, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtRepositoryService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: Prisma.JwtCreateInput): Promise<Jwt> {
        return this.prisma.jwt.create({ data });
    }
    async findFirst(where: Prisma.JwtCreateInput): Promise<Jwt | null> {
        return this.prisma.jwt.findFirst({ where });
    }
    async delete(where: Prisma.JwtWhereUniqueInput): Promise<Jwt | null> {
        return this.prisma.jwt.delete({ where });
    }
}
