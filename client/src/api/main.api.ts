import { BACKEND_API } from '@/constants/api.constant';
import { RequestInit } from 'next/dist/server/web/spec-extension/request';

const defaultOpts = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: globalThis?.localStorage?.getItem('token')
            ? 'Bearer ' + globalThis.localStorage.getItem('token')
            : '',
    },
    credentials: 'include' as RequestCredentials,
};

export const myFetch = async (url: string, opts?: RequestInit) => {
    return fetch(BACKEND_API + url, {
        ...defaultOpts,
        ...opts,
    });
};

export const fetcher = async (url: string, opts?: RequestInit) => {
    return fetch(BACKEND_API + url, opts).then((res) => {
        return res.json();
    });
};

export const postFetcher = async <T>(url: string, data?: T, opts?: RequestInit) => {
    return fetch(BACKEND_API + url, {
        method: 'POST',
        body: JSON.stringify(data),
        ...opts,
    });
};
