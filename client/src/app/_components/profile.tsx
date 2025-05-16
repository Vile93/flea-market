import { Logout } from '@/app/_components/logout';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { AUTH_ROUTES, PANEL_ROUTES, PROFILE_ROUTES } from '@/constants/route.constant';
import { Roles } from '@/types/roles.enum';
import Link from 'next/link';
import { UserDropdownTrigger } from './user-dropdown-trigger';
import { cookies } from 'next/headers';
import { parseJWT } from '@/lib/parse-jwt';

export async function Profile() {
    const cookieStore = await cookies();
    const token = cookieStore.get('refresh')?.value;
    const payload = parseJWT(token ?? null);
    if (!payload) {
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
    if (payload?.role === Roles.ROOT || payload?.role === Roles.ADMIN) {
        return (
            <DropdownMenu>
                <UserDropdownTrigger />
                <DropdownMenuContent>
                    <Link href={PANEL_ROUTES.ADMIN.USERS}>
                        <DropdownMenuItem className="cursor-pointer">Пользователи</DropdownMenuItem>
                    </Link>
                    <Link href={PANEL_ROUTES.ADMIN.LOCATIONS}>
                        <DropdownMenuItem className="cursor-pointer">Локации</DropdownMenuItem>
                    </Link>
                    <Link href={PANEL_ROUTES.ADMIN.REGIONS}>
                        <DropdownMenuItem className="cursor-pointer">Регионы</DropdownMenuItem>
                    </Link>
                    <Link href={PANEL_ROUTES.ADMIN.CATEGORIES}>
                        <DropdownMenuItem className="cursor-pointer">Категории</DropdownMenuItem>
                    </Link>
                    <Link href={PANEL_ROUTES.ADMIN.TYPES}>
                        <DropdownMenuItem className="cursor-pointer">Типы</DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Logout />
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    if (payload.role === Roles.MODERATOR) {
        return (
            <DropdownMenu>
                <UserDropdownTrigger />
                <DropdownMenuContent>
                    {/*  <Link href={PANEL_ROUTES.MODERATOR.USERS}>
                        <DropdownMenuItem className="cursor-pointer">Пользователи</DropdownMenuItem>
                    </Link>
                    <Link href={PANEL_ROUTES.MODERATOR.CHATS}>
                        <DropdownMenuItem className="cursor-pointer">Чаты</DropdownMenuItem>
                    </Link>
                    <Link href={PANEL_ROUTES.MODERATOR.REPORTS}>
                        <DropdownMenuItem className="cursor-pointer">Отчеты</DropdownMenuItem>
                    </Link> */}
                    <Link href={PANEL_ROUTES.MODERATOR.OFFERS}>
                        <DropdownMenuItem className="cursor-pointer">Объявления</DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Logout />
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <DropdownMenu>
            <UserDropdownTrigger />
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
}
