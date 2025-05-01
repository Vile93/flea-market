import { Roles } from './roles.enum';

export interface UpdateUser {
    name: string;
    surname: string;
    newPassword: string;
    oldPassowrd: string;
}

export interface User {
    id: number;
    email: string;
    is_verified: boolean;
    avatar_path: string | null;
    phone: string;
    role: Roles;
    name: string;
    surname: string | null;
    username: string;
}
