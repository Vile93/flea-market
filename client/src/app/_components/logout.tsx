'use client';

import { fetchLogout } from '@/api/auth.api';
import { useFetch } from '@/hooks/use-fetch.hook';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useEffect, useContext } from 'react';
import { AuthContext } from '@/contexts/auth.context';

export function Logout() {
    const authContext = useContext(AuthContext);
    const logoutFetch = useFetch(fetchLogout);
    const router = useRouter();
    useEffect(() => {
        if (logoutFetch.isSuccessCompleted && logoutFetch.statusCode === 201) {
            router.push('/');
            router.refresh();
            authContext?.setAuth({
                isAuth: false,
                token: null,
                payload: null,
            });
        }
    }, [logoutFetch.isSuccessCompleted]);
    return (
        <DropdownMenuItem onClick={() => logoutFetch.fetchData()} className="cursor-pointer">
            <div>Выход</div>
        </DropdownMenuItem>
    );
}
