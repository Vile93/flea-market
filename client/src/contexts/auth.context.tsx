'use client';

import React, { createContext, FC, useEffect, useState } from 'react';
import { AuthData } from '@/types/context.interface';
import { parseJWT } from '@/lib/parse-jwt';

type AuthContextType = {
    auth: AuthData;
    setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProps {
    children: React.ReactNode;
}

const AuthProvider: FC<AuthContextProps> = ({ children }) => {
    const token = globalThis?.localStorage?.getItem('token');
    const [authData, setAuthData] = useState<AuthData>({
        isAuth: !!token,
        token: token,
        payload: parseJWT(token),
    });

    useEffect(() => {
        const token = globalThis?.localStorage?.getItem('token');
        setAuthData({
            isAuth: !!token,
            token: token,
            payload: parseJWT(token),
        });
    }, [authData.isAuth]);

    useEffect(() => {
        if (!authData.isAuth) {
            globalThis?.localStorage?.removeItem('token');
        }
    }, [authData.isAuth]);

    return <AuthContext.Provider value={{ auth: authData, setAuth: setAuthData }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
