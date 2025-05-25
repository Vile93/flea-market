'use client';

import NotFound from '@/components/not-found';
import { Button } from '@/components/ui/button';
import { CircleCheckBig } from 'lucide-react';
import Link from 'next/link';
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
    return (
        <div className="flex flex-col gap-4 items-center">
            <CircleCheckBig className="w-24 h-24" />
            <div className="text-xl font-bold">{message}</div>
            <Link href={'/'}>
                <Button className="cursor-pointer">На главную</Button>
            </Link>
        </div>
    );
}
