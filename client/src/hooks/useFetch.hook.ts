import { fetchJWT } from '@/api/auth.api';
import { AuthContext } from '@/contexts/auth.context';
import { useContext, useState } from 'react';

export const useFetch = <T, Y>(callback: (...args: Y[]) => Promise<Response>, ...args: Y[]) => {
    const authContext = useContext(AuthContext);
    const [data, setData] = useState<T>();
    const [newArgs, setNewArgs] = useState<Y[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isSuccessCompleted, setIsSuccessCompleted] = useState<boolean>(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [statusCode, setStatusCode] = useState<number | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(true);

    const fetch = async (withAuth = false): Promise<Response> => {
        if (withAuth) {
            try {
                const res = await fetchJWT();
                if (res.status === 401) {
                    setIsAuth(false);
                    authContext?.setAuth((prev) => ({ ...prev, isAuth: false }));
                } else {
                    const { token } = (await res.json()) as { token: string };
                    localStorage.setItem('token', token);
                    setIsAuth(true);
                    authContext?.setAuth((prev) => ({ ...prev, isAuth: true }));
                }
            } catch {
                setIsError(true);
            }
        }
        if (newArgs) {
            return callback(...newArgs);
        } else {
            return callback(...args);
        }
    };
    const fetchData = async (withAuth = false) => {
        setIsSuccessCompleted(false);
        setIsCompleted(false);
        setIsLoading(true);
        setIsError(false);
        try {
            const res = await fetch(withAuth);
            try {
                const data = await res.json();
                setData(data);
            } catch {
                setIsError(true);
            }
            setStatusCode(res.status);
            setIsSuccessCompleted(true);
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false);
            setIsCompleted(true);
        }
    };
    return {
        data,
        fetchData,
        isAuth,
        isLoading,
        isError,
        statusCode,
        newArgs,
        setNewArgs,
        isSuccessCompleted,
        isCompleted,
    };
};
