import { BACKEND_API } from '@/constants/api.constant';
import { User } from '@/types/user.interface';
import { cookies } from 'next/headers';

export const serverGetUserProfile = async () => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh')?.value;
    const { token } = await fetch(`${BACKEND_API}/auth/jwt`, {
        method: 'POST',
        headers: {
            Cookie: `refresh=${refreshToken}`,
        },
    }).then((res) => res.json());
    const data: User = await fetch(`${BACKEND_API}/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.json());
    return data;
};
