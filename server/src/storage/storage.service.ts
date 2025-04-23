import { Injectable } from '@nestjs/common';
import { InjectS3, S3 } from 'nestjs-s3';

@Injectable()
export class StorageService {
    constructor(@InjectS3() private readonly storage: S3) {}
}
