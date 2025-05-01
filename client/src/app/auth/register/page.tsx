import { Header } from '@/app/_components/header';
import { RegisterForm } from '@/app/auth/register/_components/register-form';
import NotFound from '@/components/not-found';
import { getAuthStatus } from '@/lib/get-auth-status';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Регистрация',
};

export default async function Register() {
    const isAuth = await getAuthStatus();
    if (isAuth) return <NotFound />;
    return (
        <>
            <Header />
            <div className="flex w-full items-center justify-center p-6 md:p-10 mt-16">
                <div className="w-full max-w-sm">
                    <RegisterForm />
                </div>
            </div>
        </>
    );
}
