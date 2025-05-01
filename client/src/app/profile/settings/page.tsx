import { Metadata } from 'next';
import { SettingsForm } from './_components/settings-form';
import NotFound from '@/components/not-found';
import { getAuthStatus } from '@/lib/get-auth-status';
import { Header } from '@/app/_components/header';

export const metadata: Metadata = {
    title: 'Настройки',
};

export default async function UserSettings() {
    const isAuth = await getAuthStatus();
    if (!isAuth) return <NotFound />;
    return (
        <>
            <Header />
            <div className="flex w-full items-center justify-center p-6 md:p-10 mt-16">
                <div className="w-full max-w-sm">
                    <SettingsForm />
                </div>
            </div>
        </>
    );
}
