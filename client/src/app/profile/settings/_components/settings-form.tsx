'use client';

import { getProfile } from '@/api/user.api';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFetch } from '@/hooks/useFetch.hook';
import { useCallback, useEffect, useState } from 'react';
import * as FileUpload from '@/components/ui/file-upload';
import { Upload } from 'lucide-react';
import { FormError } from '@/components/form-error';
import { User } from '@/types/user.interface';

export function SettingsForm() {
    const userFetch = useFetch<User, null>(getProfile);
    useEffect(() => {
        userFetch.fetchData(true);
    }, []);
    const [logo, setLogo] = useState<File[]>([]);
    const [logoError, setLogoError] = useState<string | null>(null);
    const onFileValidate = useCallback((file: File) => {
        if (file.size > 2 * 1024 * 1024) {
            return `Превышен максимальный размер файла 2 мб`;
        }
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

    return (
        <div className="flex">
            <Card className="lg:-translate-x-1/4">
                <CardHeader>
                    <div className="text-2xl font-bold">Настройки</div>
                </CardHeader>
                <CardContent className="lg:w-2xl">
                    <form>
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
                                                <FileUpload.ItemPreview className="h-full w-full" />
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
                                        <Input placeholder="Иван" id="name" defaultValue={userFetch.data?.name} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-lg" htmlFor="surname">
                                            Фамилия
                                        </Label>
                                        <Input
                                            placeholder="Иванов"
                                            id="surname"
                                            defaultValue={userFetch.data?.surname ?? ''}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label className="text-lg" htmlFor="old-password">
                                        Старый пароль
                                    </Label>
                                    <Input id="old-password" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label className="text-lg" htmlFor="new-password">
                                        Новый пароль
                                    </Label>
                                    <Input id="new-password" />
                                </div>
                                <div className="flex flex-col gap-2 cursor-not-allowed">
                                    <Label className="text-lg" htmlFor="username">
                                        Логин
                                    </Label>
                                    <Input id="username" defaultValue={userFetch.data?.username} disabled />
                                </div>
                                <div className="flex flex-col gap-2 cursor-not-allowed">
                                    <Label className="text-lg" htmlFor="email">
                                        Почта
                                    </Label>
                                    <Input id="email" defaultValue={userFetch.data?.email} disabled />
                                </div>
                                <Button className="mt-2 cursor-pointer">Сохранить</Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
