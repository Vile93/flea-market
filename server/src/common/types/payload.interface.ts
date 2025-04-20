import { Role } from '@prisma/client';

export type Payload = {
    userId: number;
    role: Role;
};
