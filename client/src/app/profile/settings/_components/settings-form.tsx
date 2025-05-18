'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCallback, useEffect, useState } from 'react';
import * as FileUpload from '@/components/ui/file-upload';
import { Upload } from 'lucide-react';
import { FormError } from '@/components/form-error';
import { UpdateProfileUser, User, UserSettings } from '@/types/user.interface';
import { Title } from '@/components/title';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { settingsSchema } from '@/validators/settings.validator';
import { useFetch } from '@/hooks/use-fetch.hook';
import { sendAvaterImage, updateProfile, updateUser } from '@/api/user.api';
import { toast } from 'sonner';
import { IMessage } from '@/types/message.interface';

interface SettingsFormProps {
    data: User;
}

export function SettingsForm({ data }: SettingsFormProps) {
    /*   const userFetch = useFetch<User, null>(getProfile);
    useEffect(() => {
        userFetch.fetchData(true);
    }, []); */
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Omit<UserSettings, 'avatar_path'>>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            name: data.name,
            surname: data.surname,
        },
    });
    const [logo, setLogo] = useState<File[]>([]);
    const [logoError, setLogoError] = useState<string | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
    const onFileValidate = useCallback((file: File) => {
        if (file.size > 2 * 1024 * 1024) {
            return `Превышен максимальный размер файла 2 мб`;
        }
        const formData = new FormData();
        formData.append('avatar', file);
        sendImage.setNewArgs([formData]);
        return null;
    }, []);
    const onFileReject = useCallback((file: File, message: string) => {
        setLogoError(message);
    }, []);
    const onFileAccept = useCallback(() => {
        setLogoError(null);
    }, []);
    const onFileChange = useCallback((file: File[]) => {
        setLogo([file[file.length - 1]]);
    }, []);
    const onSubmit: SubmitHandler<Omit<UserSettings, 'avatar_path'>> = (data) => {
        const userSettings: UserSettings = {
            name: data.name,
            surname: data.surname || undefined,
            newPassword: data.newPassword || undefined,
            oldPassword: data.oldPassword || undefined,
            avatar_path: avatarUrl,
        };
        updateUser.setNewArgs([userSettings]);
    };
    const sendImage = useFetch<{ url: string }, FormData>(sendAvaterImage);
    const updateUser = useFetch<User | IMessage, UpdateProfileUser>(updateProfile);
    useEffect(() => {
        if (updateUser.newArgs) {
            updateUser.fetchData(true);
        }
    }, [updateUser.newArgs]);
    useEffect(() => {
        if (updateUser.isSuccessCompleted && updateUser.statusCode === 200) {
            toast.success('Данные успешно изменены');
        }
    }, [updateUser.isSuccessCompleted]);
    useEffect(() => {
        if (sendImage.newArgs) {
            sendImage.fetchData(true);
        }
    }, [sendImage.newArgs]);
    useEffect(() => {
        if (sendImage.data?.url) {
            setAvatarUrl(sendImage.data.url);
        }
    }, [sendImage.data]);
    return (
        <div className="flex">
            <Card className="lg:-translate-x-1/4">
                <CardHeader>
                    <Title name="Настройки" />
                </CardHeader>
                <CardContent className="lg:w-2xl">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex gap-4 flex-col lg:flex-row">
                            <div className="flex flex-col gap-2 text-center" style={{ flex: '50%' }}>
                                <Label className="text-lg">Аватарка</Label>
                                <FileUpload.Root
                                    value={logo}
                                    onValueChange={onFileChange}
                                    maxFiles={2}
                                    onFileValidate={onFileValidate}
                                    onFileAccept={onFileAccept}
                                    onFileReject={onFileReject}
                                    accept="image/*"
                                >
                                    <FileUpload.Dropzone className="cursor-pointer">
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="flex items-center justify-center rounded-full border p-2.5">
                                                <Upload className="size-6 text-muted-foreground" />
                                            </div>
                                            <p className="font-medium text-sm">Перетащи фото сюда</p>
                                            <FileUpload.FileUploadTrigger asChild className="cursor-pointer">
                                                <Button variant="outline" size="sm" className="mt-2 w-fit">
                                                    Обзор файлов
                                                </Button>
                                            </FileUpload.FileUploadTrigger>
                                        </div>
                                    </FileUpload.Dropzone>
                                    <FileUpload.List>
                                        {logo.map((file) => (
                                            <FileUpload.Item
                                                key={file.name}
                                                value={file}
                                                className="flex justify-center w-full"
                                            >
                                                <FileUpload.ItemPreview className="h-32 w-32 sm:h-64 sm:w-64" />
                                            </FileUpload.Item>
                                        ))}
                                    </FileUpload.List>
                                    <FileUpload.Clear />
                                </FileUpload.Root>
                                <FormError error={logoError} />
                            </div>
                            <div className="flex flex-col gap-2" style={{ flex: '50%' }}>
                                <div className="flex gap-2">
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-lg" htmlFor="name">
                                            Имя *
                                        </Label>
                                        <Input placeholder="Иван" id="name" {...register('name')} />
                                        <FormError error={errors.name?.message} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-lg" htmlFor="surname">
                                            Фамилия
                                        </Label>
                                        <Input placeholder="Иванов" id="surname" {...register('surname')} />
                                        <FormError error={errors.surname?.message} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label className="text-lg" htmlFor="old-password">
                                        Старый пароль
                                    </Label>
                                    <Input id="old-password" type="password" {...register('oldPassword')} />
                                    <FormError error={errors.oldPassword?.message} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label className="text-lg" htmlFor="new-password">
                                        Новый пароль
                                    </Label>
                                    <Input id="new-password" type="password" {...register('newPassword')} />
                                    <FormError error={errors.newPassword?.message} />
                                </div>
                                <div className="flex flex-col gap-2 cursor-not-allowed">
                                    <Label className="text-lg" htmlFor="username">
                                        Логин
                                    </Label>
                                    <Input id="username" defaultValue={data?.username} disabled />
                                </div>
                                <div className="flex flex-col gap-2 cursor-not-allowed">
                                    <Label className="text-lg" htmlFor="email">
                                        Почта
                                    </Label>
                                    <Input id="email" defaultValue={data?.email} disabled />
                                </div>
                                <Button type="submit" className="mt-2 cursor-pointer" disabled={sendImage.isLoading}>
                                    Сохранить
                                </Button>
                                <FormError
                                    error={
                                        updateUser.data && updateUser.statusCode === 400 && 'message' in updateUser.data
                                            ? updateUser.data?.message
                                            : null
                                    }
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
