'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AUTH_ROUTES } from '@/constants/route.constant';
import { useFetch } from '@/hooks/useFetch.hook';
import { fetchRegister } from '@/api/auth.api';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/loader';
import { FormError } from '@/components/form-error';
import { registerSchema } from '@/validators/auth.validator';

type Inputs = {
    name: string;
    surname?: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    repeatPassword: string;
};

export function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(registerSchema),
    });
    const registerFetch = useFetch(fetchRegister);
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        registerFetch.setNewArgs([data]);
    };
    const router = useRouter();
    useEffect(() => {
        if (registerFetch.newArgs) {
            registerFetch.fetchData();
        }
    }, [registerFetch.newArgs]);
    useEffect(() => {
        if (registerFetch.isSuccessCompleted && registerFetch.statusCode === 201) {
            localStorage.setItem('token', (registerFetch.data as { token: string }).token);
            router.push('/');
            router.refresh();
        }
    }, [registerFetch.isSuccessCompleted]);
    console.log(errors);
    if (registerFetch.isLoading)
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
                    <CardTitle className="text-2xl">Регистрация</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="flex gap-2">
                                <div>
                                    <Label htmlFor="name">Имя *</Label>
                                    <Input
                                        className="mt-2"
                                        id="name"
                                        placeholder="Иван"
                                        required
                                        {...register('name')}
                                    />
                                    <FormError error={errors?.name?.message} />
                                </div>
                                <div>
                                    <Label htmlFor="surname">Фамилия</Label>
                                    <Input
                                        className="mt-2"
                                        id="surname"
                                        placeholder="Иванов"
                                        required
                                        {...register('surname')}
                                    />
                                    <FormError error={errors?.surname?.message} />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="username">Логин *</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Ivan"
                                    required
                                    {...register('username')}
                                />
                                <FormError error={errors?.username?.message} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Почта *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="ivan@gmail.com"
                                    required
                                    {...register('email')}
                                />
                                <FormError error={errors?.email?.message} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Телефон *</Label>
                                <Input
                                    id="phone"
                                    type="number"
                                    placeholder="375XXXXXXXXX"
                                    required
                                    {...register('phone')}
                                />
                                <FormError error={errors?.phone?.message} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Пароль *</Label>
                                <Input id="password" type="password" required {...register('password')} />
                                <FormError error={errors?.password?.message} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="repeatPassword">Повторите пароль *</Label>
                                <Input id="repeatPassword" type="password" required {...register('repeatPassword')} />
                                <FormError error={errors?.repeatPassword?.message} />
                            </div>
                            <Button type="submit" className="w-full cursor-pointer">
                                Зарегистрироваться
                            </Button>
                            {registerFetch.statusCode === 409 ? (
                                <FormError
                                    error={
                                        'Пользователь с такой почтой, именем или номером телефона уже зарегистрирован'
                                    }
                                />
                            ) : null}
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Уже имеете{' '}
                            <Link href={AUTH_ROUTES.LOGIN} className="underline underline-offset-4">
                                аккаунт
                            </Link>
                            ?
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
