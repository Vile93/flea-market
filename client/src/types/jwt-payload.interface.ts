import { Roles } from './roles.enum';

export interface IJwtPayload {
    id: number;
    role: (typeof Roles)[keyof typeof Roles];
}
