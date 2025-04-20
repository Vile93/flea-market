/* import { Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserDto {
    constructor(partial: Partial<UserDto>) {
        Object.assign(this, partial);
    }

    id: number;
    name: string;
    surname: string;
    username: string;
    email: string;
    phone: string;
    is_verified: boolean;
    avatar_path: string;
    role: Role;
    @Exclude()
    password: string;
}
 */
