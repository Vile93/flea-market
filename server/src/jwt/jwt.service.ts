import { Injectable } from '@nestjs/common';
import { JwtRepositoryService } from 'src/jwt/jwt-repository.service';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { Payload } from 'src/common/types/payload.type';
import { Jwt } from '@prisma/client';

@Injectable()
export class JwtService {
    constructor(
        private readonly jwtService: NestJwtService,
        private readonly jwtRepository: JwtRepositoryService,
    ) {}
    async verifyRefresh(token: string): Promise<Payload | null> {
        try {
            return await this.jwtService.verifyAsync<Payload>(token);
        } catch {
            return null;
        }
    }
    async createRefresh(payload: Payload): Promise<Jwt> {
        const refreshToken = await this.jwtService.signAsync(payload);
        const token = await this.jwtRepository.create({ token: refreshToken });
        return token;
    }
    async findRefresh(token: string): Promise<Jwt | null> {
        return this.jwtRepository.findFirst({ token });
    }
    async deleteRefesh(token: string): Promise<Jwt | null> {
        return this.jwtRepository.delete({ token });
    }
}
