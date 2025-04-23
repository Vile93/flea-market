import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './jwt/jwt.module';
import { OfferModule } from './offer/offer.module';
import { ReviewModule } from './review/review.module';
import { RegionModule } from './region/region.module';
import { LocationModule } from './location/location.module';
import { TypeModule } from './type/type.module';
import { CategoryModule } from './category/category.module';
import { StorageModule } from './storage/storage.module';

@Module({
    imports: [
        PrismaModule,
        UserModule,
        ConfigModule.forRoot({ envFilePath: '../.env', isGlobal: true, cache: true }),
        AuthModule,
        JwtModule,
        OfferModule,
        ReviewModule,
        RegionModule,
        LocationModule,
        TypeModule,
        CategoryModule,
        StorageModule,
    ],
})
export class AppModule {}
