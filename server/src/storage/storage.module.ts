import { Module } from '@nestjs/common';
import { S3Module } from 'nestjs-s3';
import { StorageService } from './storage.service';
import { ConfigService } from '@nestjs/config';
import { ENV } from 'src/common/types/env.enum';

@Module({
    imports: [
        S3Module.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                config: {
                    credentials: {
                        accessKeyId: configService.getOrThrow(ENV.BUCKET_ACCESS_KEY),
                        secretAccessKey: configService.getOrThrow(ENV.BUCKET_SECRET_KEY),
                    },
                    endpoint: configService.getOrThrow(ENV.BUCKET_URL),
                    forcePathStyle: true,
                    signatureVersion: 'v4',
                },
            }),
        }),
    ],
    providers: [StorageService],
})
export class StorageModule {}
