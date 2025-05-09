'use client';

import { fetchLogout } from '@/api/auth.api';
import { useFetch } from '@/hooks/use-fetch.hook';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function Logout() {
    const logoutFetch = useFetch(fetchLogout);
    const router = useRouter();
    useEffect(() => {
        if (logoutFetch.isSuccessCompleted && logoutFetch.statusCode === 201) {
            router.push('/');
            router.refresh();
        }
    }, [logoutFetch.isSuccessCompleted]);
    return (
        <DropdownMenuItem onClick={() => logoutFetch.fetchData()} className="cursor-pointer">
            <div>Выход</div>
        </DropdownMenuItem>
    );
}
