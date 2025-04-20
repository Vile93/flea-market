import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepositoryService } from 'src/user/user-repository.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { JwtService } from '@nestjs/jwt';
import { SALT } from 'src/common/constants';
import { JwtPayload } from '../../../shared/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepositoryService,
        private readonly jwtService: JwtService,
    ) {}
    async validateUser(login: string, password: string): Promise<User | null> {
        const candidate = await this.userRepository.findByLogin(login);
        if (!candidate) return null;
        const isCorrect = await bcrypt.compare(password, candidate.password);
        if (!isCorrect) return null;
        return candidate;
    }
    async registerUser(authRegisterDto: AuthRegisterDto) {
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
        const token = await this.jwtService.signAsync({ id: user.id });
        return { token };
    }
    async loginUser(jwtPayload: JwtPayload) {
        const token = await this.jwtService.signAsync(jwtPayload);
        return { token };
    }
}
