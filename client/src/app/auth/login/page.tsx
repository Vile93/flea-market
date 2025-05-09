import { LoginForm } from '@/app/auth/login/_components/login-form';
import NotFound from '@/components/not-found';
import { getAuthStatus } from '@/lib/get-auth-status';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Авторизация',
};

export default async function Login() {
    const isAuth = await getAuthStatus();
    if (isAuth) return <NotFound />;
    return (
        <>
            <div className="flex w-full items-center justify-center p-6 md:p-10 mt-16">
                <div className="w-full max-w-sm">
                    <LoginForm />
                </div>
            </div>
        </>
    );
}
