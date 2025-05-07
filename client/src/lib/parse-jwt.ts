import { IJwtPayload } from '@/types/jwt-payload.interface';

export const parseJWT = (token: string | null): IJwtPayload | null => {
    try {
        if (typeof token !== 'string') return null;
        return JSON.parse(atob(token.split('.')[1])) as IJwtPayload;
    } catch {
        return null;
    }
};
