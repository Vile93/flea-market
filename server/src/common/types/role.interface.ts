import { Role } from '@prisma/client';

export type IRole = {
    [K in Role]: string;
};
