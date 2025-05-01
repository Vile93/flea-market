import { myFetch } from '@/api/main.api';
import { Login, Register } from '@/types/auth.interface';

export const fetchLogin = async (data: Login) => {
    return myFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const fetchRegister = async (data: Register) => {
    return myFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const fetchJWT = () => {
    return myFetch('/auth/jwt', {
        method: 'POST',
    });
};

export const fetchLogout = async () => {
    return myFetch('/auth/logout', {
        method: 'POST',
    });
};
