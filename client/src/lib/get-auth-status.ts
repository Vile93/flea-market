import { cookies } from 'next/headers';

export async function getAuthStatus() {
    const cookieStore = await cookies();
    const token = cookieStore.get('refresh');
    if (!token) return false;
    return true;
}
