import { Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
    avatar_path: string | null;
    email: string;
    id: number;
    is_verified: boolean | null;
    name: string;
    phone: string;
    role: Role;
    surname: string | null;
    username: string;

    @Exclude()
    password: string;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
