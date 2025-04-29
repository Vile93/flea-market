import { defaultOpts, myFetch } from '@/api/main.api';
import { Login, Register } from '@/types/auth.interface';

export const fetchLogin = async (data: Login) => {
    return myFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        ...defaultOpts,
    });
};

export const fetchRegister = async (data: Register) => {
    return myFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        ...defaultOpts,
    });
};

export const fetchJWT = () => {};

export const fetchLogout = async () => {
    return myFetch('/auth/logout', {
        method: 'POST',
        ...defaultOpts,
    });
};
