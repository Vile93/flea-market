import { useState } from 'react';

export const useFetch = <T, Y>(callback: (...args: Y[]) => Promise<Response>, ...args: Y[]) => {
    const [data, setData] = useState<T>();
    const [newArgs, setNewArgs] = useState<Y[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isSuccessCompleted, setIsSuccessCompleted] = useState<boolean>(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [statusCode, setStatusCode] = useState<number | null>(null);

    const fetch = async (): Promise<Response> => {
        if (newArgs) {
            return callback(...newArgs);
        } else {
            return callback(...args);
        }
    };
    const fetchData = async () => {
        setIsSuccessCompleted(false);
        setIsCompleted(false);
        setIsLoading(true);
        setIsError(false);
        try {
            const res = await fetch();
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
        isLoading,
        isError,
        statusCode,
        newArgs,
        setNewArgs,
        isSuccessCompleted,
        isCompleted,
    };
};
