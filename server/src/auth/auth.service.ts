import { ConflictException, Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { UserRepositoryService } from 'src/user/user-repository.service';
import * as bcrypt from 'bcrypt';
import { Role, User } from '@prisma/client';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { SALT } from 'src/common/constants';
import { Payload } from 'src/common/types/payload.interface';
import { JwtService } from 'src/jwt/jwt-service.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepositoryService,
        private readonly jwtService: JwtService,
        private readonly nestJwtService: NestJwtService,
    ) {}

    async register(authRegisterDto: AuthRegisterDto): Promise<{ accessToken: string; refreshToken: string }> {
        const { username, email, phone } = authRegisterDto;
        const candidate = await this.userRepository.findFirst({
            OR: [
                {
                    email,
                },
                {
                    username,
                },
                {
                    phone,
                },
            ],
        });
        if (candidate) throw new ConflictException('User with this email, username or phone already exists');
        const hashedPassword = await bcrypt.hash(authRegisterDto.password, SALT);
        const user = await this.userRepository.create({
            ...authRegisterDto,
            password: hashedPassword,
        });
        const accessToken = await this.nestJwtService.signAsync({ userId: user.id, role: Role.USER });
        const refreshToken = (await this.jwtService.createRefresh({ userId: user.id, role: Role.USER })).token;
        return { accessToken, refreshToken };
    }
    async login(user: User): Promise<{ accessToken: string; refreshToken: string }> {
        const payload: Payload = {
            role: user.role,
            userId: user.id,
        };
        const accessToken = await this.nestJwtService.signAsync(payload);
        const refreshToken = (await this.jwtService.createRefresh(payload)).token;
        return { accessToken, refreshToken };
    }
    async logout(@Req() token?: string) {
        if (!token) throw new UnauthorizedException();
        const payload = await this.jwtService.verifyRefresh(token);
        if (!payload) throw new UnauthorizedException();
        await this.jwtService.deleteRefesh(token);
    }
    async jwt(@Req() token?: string) {
        if (!token) throw new UnauthorizedException();
        const payload = await this.jwtService.verifyRefresh(token);
        if (!payload) {
            throw new UnauthorizedException();
        }
        const dbToken = await this.jwtService.findRefresh(token);
        if (!dbToken) {
            throw new UnauthorizedException();
        }
        const accessToken = await this.nestJwtService.signAsync({ userId: payload.userId, role: payload.role });
        return { token: accessToken };
    }
}
