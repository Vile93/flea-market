import { Logout } from '@/app/_components/logout';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { AUTH_ROUTES, PROFILE_ROUTES } from '@/constants/route.constant';
import { getAuthStatus } from '@/lib/get-auth-status';
import { User } from 'lucide-react';
import Link from 'next/link';

export async function Profile() {
    const isAuth = await getAuthStatus();
    if (isAuth)
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="cursor-pointer" variant="outline" size="icon">
                        <User className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:text-white" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <Link href={PROFILE_ROUTES.OFFERS}>
                        <DropdownMenuItem className="cursor-pointer">Мои объявления</DropdownMenuItem>
                    </Link>

                    <Link href={PROFILE_ROUTES.CHATS}>
                        <DropdownMenuItem className="cursor-pointer">Чаты</DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link href={PROFILE_ROUTES.SETTINGS}>
                        <DropdownMenuItem className="cursor-pointer">Настройки</DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Logout />
                </DropdownMenuContent>
            </DropdownMenu>
        );
    return (
        <>
            <Link href={AUTH_ROUTES.REGISTER}>
                <Button className="cursor-pointer px-2 sm:px-4">Регистрация</Button>
            </Link>
            <Link href={AUTH_ROUTES.LOGIN}>
                <Button className="cursor-pointer px-2 sm:px-4">Войти</Button>
            </Link>
        </>
    );
}
