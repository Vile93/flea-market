import { BACKEND_API } from '@/constants/api.constant';
import { cookies } from 'next/headers';
import { setQuery } from '@/lib/set-query';
import { PANEL_TABLE_PAGINATION } from '@/constants/panel.constant';
import { OfferModerateWithImages } from '@/types/offer.interface';

const serverGetPanelData = async <T>(url: string) => {
    const defaultQuery = {
        take: PANEL_TABLE_PAGINATION.START_TAKE,
        skip: PANEL_TABLE_PAGINATION.START_SKIP,
    };
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh')?.value;
    const { token } = await fetch(`${BACKEND_API}/auth/jwt`, {
        method: 'POST',
        headers: {
            Cookie: `refresh=${refreshToken}`,
        },
    }).then((res) => res.json());
    const data: { totalCount: number; data: T[] } = await fetch(`${BACKEND_API}/${url}${setQuery(defaultQuery)}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.json());
    return data;
};

const serverGetModerateOffer = async (id: string) => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh')?.value;
    const { token } = await fetch(`${BACKEND_API}/auth/jwt`, {
        method: 'POST',
        headers: {
            Cookie: `refresh=${refreshToken}`,
        },
    }).then((res) => res.json());
    const data: OfferModerateWithImages = await fetch(`${BACKEND_API}/offers/${id}/moderate`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.json());
    return data;
};

export { serverGetPanelData, serverGetModerateOffer };
