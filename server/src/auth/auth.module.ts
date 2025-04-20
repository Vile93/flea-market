import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { ENV } from 'src/common/types/env.enum';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
    imports: [
        UserModule,
        JwtModule,
        PassportModule,
        NestJwtModule.registerAsync({
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    secret: configService.getOrThrow(ENV.JWT_ACCESS_SECRET),
                    signOptions: { expiresIn: '1d' },
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
