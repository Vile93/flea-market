import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [PrismaModule, UserModule, ConfigModule.forRoot({ envFilePath: '../.env', isGlobal: true, cache: true }), AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
