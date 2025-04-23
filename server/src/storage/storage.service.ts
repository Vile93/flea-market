import { S3Client, ObjectCannedACL, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import path from 'path';
import { ENV } from 'src/common/types/env.enum';

@Injectable()
export class StorageService {
    private client: S3Client;
    constructor(private readonly configService: ConfigService) {
        this.client = new S3Client({
            region: configService.getOrThrow(ENV.BUCKET_REGION),
            endpoint: configService.getOrThrow(ENV.BUCKET_URL),
            credentials: {
                accessKeyId: configService.getOrThrow(ENV.BUCKET_ACCESS_KEY),
                secretAccessKey: configService.getOrThrow(ENV.BUCKET_SECRET_KEY),
            },
        });
    }

    async uploadFile(file: Express.Multer.File, ACL: ObjectCannedACL) {
        const uuid = randomUUID();
        const fileName = uuid + path.extname(file.originalname);
        const command = new PutObjectCommand({
            Bucket: this.configService.getOrThrow(ENV.BUCKET_NAME),
            Key: fileName,
            Body: file.buffer,
            ACL,
        });
        try {
            await this.client.send(command);
            return fileName;
        } catch {
            return null;
        }
    }

    async deleteFile(path: string): Promise<boolean> {
        const command = new DeleteObjectCommand({
            Bucket: this.configService.getOrThrow(ENV.BUCKET_NAME),
            Key: path,
        });
        try {
            await this.client.send(command);
            return true;
        } catch {
            return false;
        }
    }

    async getUrlFile(path: string) {
        const command = new GetObjectCommand({
            Bucket: this.configService.getOrThrow(ENV.BUCKET_NAME),
            Key: path,
        });
        try {
            const url = await getSignedUrl(this.client, command);
            return url;
        } catch {
            return null;
        }
    }
}
