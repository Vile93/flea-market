'use client';

import React, { createContext, FC, useState } from 'react';
import { AuthData } from '@/types/context.interface';

type AuthContextType = {
    auth: AuthData;
    setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProps {
    children: React.ReactNode;
}

const AuthProvider: FC<AuthContextProps> = ({ children }) => {
    const [authData, setAuthData] = useState<AuthData>({
        isAuth: !!globalThis?.localStorage?.getItem('token'),
    });
    return <AuthContext.Provider value={{ auth: authData, setAuth: setAuthData }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
