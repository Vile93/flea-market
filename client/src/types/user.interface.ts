import { Roles } from './roles.enum';

export interface UpdateProfileUser {
    name: string;
    surname: string;
    newPassword: string;
    oldPassowrd: string;
}

export interface User {
    id: number;
    email: string;
    password: string;
    phone: string;
    role: Roles.ADMIN | Roles.MODERATOR;
    name: string;
    surname?: string;
    username: string;
    is_verified: boolean;
    avatar_path?: string;
}

export interface CreatePanelUser {
    email: string;
    password: string;
    phone: string;
    role: Roles.ADMIN | Roles.MODERATOR | Roles.USER;
    name: string;
    surname?: string;
    username: string;
    /*  is_verified: boolean; */
}

export interface UpdatePanelUser {
    email: string;
    password?: string;
    phone: string;
    role: Roles.ADMIN | Roles.MODERATOR | Roles.USER;
    name: string;
    surname?: string;
    username: string;
    /*  is_verified: boolean; */
    /* avatar_path?: string; */
}
