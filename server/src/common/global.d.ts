import { User as UserType } from '@prisma/client';
import { Payload } from 'src/common/types/payload.type';

declare global {
    namespace Express {
        type User = UserType;
        interface Request {
            user: { info: UserType; payload: Payload };
        }
    }
}
