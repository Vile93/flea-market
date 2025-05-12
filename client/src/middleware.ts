import { PANEL_ROUTES } from '@/constants/route.constant';
import { parseJWT } from '@/lib/parse-jwt';
import { Roles } from '@/types/roles.enum';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const cookieStore = await cookies();
    const token = cookieStore.get('refresh')?.value;
    const payload = parseJWT(token ?? null);
    if (payload?.role === Roles.ROOT) {
        return NextResponse.next({
            headers: {
                'x-pathname': pathname,
                'x-role': payload?.role,
            },
        });
    }
    if (
        !Object.values(PANEL_ROUTES.ADMIN).includes(pathname) &&
        !Object.values(PANEL_ROUTES.MODERATOR).includes(pathname)
    ) {
        return NextResponse.next();
    }
    if (payload?.role !== Roles.ADMIN && payload?.role !== Roles.MODERATOR) {
        return NextResponse.rewrite(new URL('/404', request.url));
    }
    if (payload.role === Roles.ADMIN && !Object.values(PANEL_ROUTES.ADMIN).includes(pathname)) {
        return NextResponse.rewrite(new URL('/404', request.url));
    }
    if (payload.role === Roles.MODERATOR && !Object.values(PANEL_ROUTES.MODERATOR).includes(pathname)) {
        return NextResponse.rewrite(new URL('/404', request.url));
    }
    return NextResponse.next({
        headers: {
            'x-pathname': pathname,
            'x-role': payload?.role,
        },
    });
}
