'use client';

import NotFound from '@/components/not-found';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function SuccessForm() {
    const message = globalThis.sessionStorage?.getItem('user-offer-message');
    const pathname = usePathname();
    useEffect(() => {
        if (pathname && pathname !== '/offers/success') {
            globalThis.sessionStorage?.removeItem?.('user-offer-message');
        }
    }, [pathname]);

    if (!globalThis.sessionStorage) {
        return <></>;
    }
    if (!globalThis.sessionStorage.getItem('user-offer-message')) {
        return <NotFound />;
    }
    return <div>{message}</div>;
}
