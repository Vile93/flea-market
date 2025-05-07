import { IJwtPayload } from './jwt-payload.interface';

export interface AuthData {
    isAuth: boolean;
    token: string | null;
    payload: IJwtPayload | null;
}
