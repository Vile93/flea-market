'use client';

import { Button } from '@/components/ui/button';
import { PROFILE_ROUTES } from '@/constants/route.constant';
import { LayoutList, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface LinkProps {
    link: string;
    icon: ReactNode;
}

function UnactiveLink({ link, icon }: LinkProps) {
    return (
        <Link href={link}>
            <Button className="bg-transparent text-black hover:bg-transparent dark:text-white cursor-pointer">
                {icon}
            </Button>
        </Link>
    );
}

function ActiveLink({ link, icon }: LinkProps) {
    return (
        <Link href={link}>
            <Button className="bg-black text-white dark:bg-white  dark:hover:bg-white hover:bg-black dark:text-black cursor-pointer">
                {icon}
            </Button>
        </Link>
    );
}

export function Nav() {
    const path = usePathname();

    return (
        <div className="flex gap-2">
            {path === PROFILE_ROUTES.OFFERS ? (
                <ActiveLink icon={<LayoutList />} link={PROFILE_ROUTES.OFFERS} />
            ) : (
                <UnactiveLink icon={<LayoutList />} link={PROFILE_ROUTES.OFFERS} />
            )}
            {path === PROFILE_ROUTES.CREATE_OFFER ? (
                <ActiveLink icon={<Plus />} link={PROFILE_ROUTES.CREATE_OFFER} />
            ) : (
                <UnactiveLink icon={<Plus />} link={PROFILE_ROUTES.CREATE_OFFER} />
            )}
        </div>
    );
}
