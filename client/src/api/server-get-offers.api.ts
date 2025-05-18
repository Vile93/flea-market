import { COUNT_OF_OFFERS_PER_PAGE } from '@/api/constraint.api';
import { BACKEND_API } from '@/constants/api.constant';
import { setQuery } from '@/lib/set-query';
import { IMessage } from '@/types/message.interface';
import { OfferFind, OfferUser } from '@/types/offer.interface';
import { User } from '@/types/user.interface';
import { cookies } from 'next/headers';

export const serverGetOffers = async () => {
    const defaultQuery = {
        take: COUNT_OF_OFFERS_PER_PAGE,
        skip: 0,
    };
    const data: { data: OfferFind[]; totalCount: number } = await fetch(
        `${BACKEND_API}/offers${setQuery(defaultQuery)}`,
    ).then((res) => res.json());
    return data;
};

export const serverGetOffer = async (id: string) => {
    const data: (OfferFind & { user_ref: Pick<User, 'avatar_path' | 'phone' | 'username'> }) | IMessage = await fetch(
        `${BACKEND_API}/offers/${id}`,
    ).then((res) => res.json());
    return data;
};

export const serverGetUserOffers = async () => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh')?.value;
    const { token } = await fetch(`${BACKEND_API}/auth/jwt`, {
        method: 'POST',
        headers: {
            Cookie: `refresh=${refreshToken}`,
        },
    }).then((res) => res.json());
    const data: OfferUser[] = await fetch(`${BACKEND_API}/users/offers`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.json());
    return data;
};
