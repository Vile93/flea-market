import { ModeToggle } from '@/app/_components/mode-toggle';
import Link from 'next/link';
import { Profile } from '@/app/_components/profile';
import { cookies } from 'next/headers';
import { parseJWT } from '@/lib/parse-jwt';

export async function Header() {
    const cookieStore = await cookies();
    const token = cookieStore.get('refresh')?.value;
    const payload = parseJWT(token ?? null);
    return (
        <header className="container mx-auto my-2 px-2">
            <div className="flex justify-between items-center py-2">
                <div className="text-2xl sm:text-4xl font-bold">
                    <Link href={'/'}>Zorka</Link>
                </div>
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <Profile payload={payload} />
                </div>
            </div>
        </header>
    );
}
