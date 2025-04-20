import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    secret: configService.getOrThrow('JWT_SECRET'),
                    signOptions: { expiresIn: '60s' },
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
