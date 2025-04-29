import { ModeToggle } from '@/app/_components/mode-toggle';
import { Profile } from '@/app/_components/profile';
import Link from 'next/link';

export async function Header() {
    return (
        <header className="container mx-auto my-2 px-2">
            <div className="flex justify-between items-center">
                <div className="text-2xl sm:text-4xl font-bold">
                    <Link href={'/'}>Zorka</Link>
                </div>
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <Profile />
                </div>
            </div>
        </header>
    );
}
