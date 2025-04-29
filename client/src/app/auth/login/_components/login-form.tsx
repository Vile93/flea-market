'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/validators/auth.validator';
import { AUTH_ROUTES } from '@/constants/route.constant';
import { useFetch } from '@/hooks/useFetch.hook';
import { fetchLogin } from '@/api/auth.api';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/loader';
import { FormError } from '@/components/form-error';

type Inputs = {
    login: string;
    password: string;
};

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(loginSchema),
    });
    const loginFetch = useFetch(fetchLogin);
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        loginFetch.setNewArgs([data]);
    };
    const router = useRouter();
    useEffect(() => {
        if (loginFetch.newArgs) {
            loginFetch.fetchData();
        }
    }, [loginFetch.newArgs]);
    useEffect(() => {
        if (loginFetch.isSuccessCompleted && loginFetch.statusCode === 201) {
            localStorage.setItem('token', (loginFetch.data as { token: string }).token);
            router.push('/');
            router.refresh();
        }
    }, [loginFetch.isSuccessCompleted]);

    if (loginFetch.isLoading)
        return (
            <div className={cn('flex flex-col gap-6', className)} {...props}>
                <Card>
                    <CardContent>
                        <Spinner size={'large'} className="mt-24" />
                    </CardContent>
                </Card>
            </div>
        );
    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Авторизация</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="login">Логин *</Label>
                                <Input
                                    id="login"
                                    placeholder="Введите ваш логин, почту или телефон"
                                    required
                                    {...register('login')}
                                />
                                <FormError error={errors?.login?.message} />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Пароль *</Label>
                                    <Link
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Забыли пароль?
                                    </Link>
                                </div>
                                <Input id="password" type="password" required {...register('password')} />
                                <FormError error={errors?.password?.message} />
                            </div>
                            <Button type="submit" className="w-full cursor-pointer">
                                Войти
                            </Button>
                            {loginFetch.statusCode === 401 ? (
                                <div className="text-red-400">Неправильный логин или пароль</div>
                            ) : null}
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Ещё не{' '}
                            <Link href={AUTH_ROUTES.REGISTER} className="underline underline-offset-4">
                                зарегистрированы
                            </Link>
                            ?
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
