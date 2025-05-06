import { S3Client, ObjectCannedACL, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import * as path from 'path';
import { BUCKET_NAMES } from 'src/common/constants';
import { ENV } from 'src/common/types/env.enum';
import { Readable } from 'stream';

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

    async uploadFile(
        file: Express.Multer.File,
        bucketName: (typeof BUCKET_NAMES)[keyof typeof BUCKET_NAMES],
        ACL: ObjectCannedACL,
    ) {
        const uuid = randomUUID();
        const fileName = uuid + path.extname(file.originalname);
        const command = new PutObjectCommand({
            Bucket: bucketName,
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

    async deleteFile(path: string, bucketName: (typeof BUCKET_NAMES)[keyof typeof BUCKET_NAMES]): Promise<boolean> {
        const command = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: path,
        });
        try {
            await this.client.send(command);
            return true;
        } catch {
            return false;
        }
    }

    async getUrlFile(path: string, bucketName: (typeof BUCKET_NAMES)[keyof typeof BUCKET_NAMES]) {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: path,
        });
        try {
            const url = await getSignedUrl(this.client, command);
            return url;
        } catch {
            return null;
        }
    }
    async getFile(path: string, bucketName: (typeof BUCKET_NAMES)[keyof typeof BUCKET_NAMES]) {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: path,
        });
        try {
            const response = await this.client.send(command);
            if (!response.Body) {
                return null;
            }
            const file = await response.Body.transformToByteArray();
            const uuid = randomUUID();
            const multerFile: Express.Multer.File = {
                buffer: Buffer.from(file),
                fieldname: uuid,
                originalname: uuid,
                encoding: '7bit',
                mimetype: 'application/octet-stream',
                size: file.length,
                filename: uuid,
                path: uuid,
                stream: Readable.from(file),
                destination: uuid,
            };
            return multerFile;
        } catch {
            return null;
        }
    }
}
