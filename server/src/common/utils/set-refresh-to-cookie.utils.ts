import { Response } from 'express';

export const setRefreshToCookie = (res: Response, token: string) => {
    return res.cookie('refresh', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 24 * 7,
    });
};
