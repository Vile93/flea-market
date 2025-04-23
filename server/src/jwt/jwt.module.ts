import { Module } from '@nestjs/common';
import { JwtRepositoryService } from './jwt-repository.service';
import { JwtService } from 'src/jwt/jwt.service';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ENV } from 'src/common/types/env.enum';

@Module({
    imports: [
        NestJwtModule.registerAsync({
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    secret: configService.getOrThrow(ENV.JWT_REFRESH_SECRET),
                    signOptions: { expiresIn: '7d' },
                };
            },
        }),
    ],
    exports: [JwtService],
    providers: [JwtRepositoryService, JwtService],
})
export class JwtModule {}
