import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SALT } from 'src/common/constants';

@Injectable()
export class BcryptService {
    async hash(data: string): Promise<string> {
        return bcrypt.hash(data, SALT);
    }
    async compare(data: string, encryptedData: string): Promise<boolean> {
        return bcrypt.compare(data, encryptedData);
    }
}
