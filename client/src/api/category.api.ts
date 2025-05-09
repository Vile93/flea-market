import { Category } from '@/types/category.interface';
import { BACKEND_API } from '@/constants/api.constant';
import { cookies } from 'next/headers';
import { setQuery } from '@/lib/set-query';
import { IQueryPanelTable } from '@/types/query.interface';

const serverGetCategories = async (query?: IQueryPanelTable) => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh')?.value;
    const { token } = await fetch(`${BACKEND_API}/auth/jwt`, {
        method: 'POST',
        headers: {
            Cookie: `refresh=${refreshToken}`,
        },
    }).then((res) => res.json());
    const data = (await fetch(`${BACKEND_API}/categories${setQuery(query)}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.json())) as { totalCount: number; data: Category[] };
    return data;
};

export { serverGetCategories };
