import { JwtSecretRequestType, JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { User as UserType } from '@prisma/client';
import { Payload } from 'src/common/types/payload.interface';

declare global {
    namespace Express {
        type User = UserType;
        interface Request {
            user: { info: UserType; payload: Payload };
        }
    }
}
