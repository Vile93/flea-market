'use client';

import { FormError } from '@/components/form-error';
import { Button } from '@/components/ui/button';
import * as FileUpload from '@/components/ui/file-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X } from 'lucide-react';
import { useState } from 'react';

export function CreateForm() {
    const [typeOfPrice, setTypeOfPrice] = useState<string | null>('price');
    const [images, setImages] = useState<File[]>([]);
    return (
        <div className="flex flex-col gap-2">
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <Label className="text-lg" htmlFor="title">
                            Заголовок
                        </Label>
                        <Input id="title" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="text-lg" htmlFor="description">
                            Описание
                        </Label>
                        <Textarea id="description" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="text-lg">Тип цены</Label>
                        <Select defaultValue="price" onValueChange={(value) => setTypeOfPrice(value)}>
                            <SelectTrigger className="cursor-pointer">
                                <SelectValue placeholder="Цена" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="price">Платно</SelectItem>
                                    <SelectItem value="contract">Договорная</SelectItem>
                                    <SelectItem value="free">Бесплатно</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {typeOfPrice === 'price' ? <Input id="price" type="number" placeholder="0.99" min={0} /> : null}
                    </div>
                    <div className="flex gap-2">
                        <div className="flex flex-col gap-2">
                            <Label className="text-lg">Состояние</Label>
                            <Select>
                                <SelectTrigger className="cursor-pointer">
                                    <SelectValue placeholder="новое" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="new">новое</SelectItem>
                                        <SelectItem value="old">б/у</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 flex-wrap">
                        <div className="flex flex-col gap-2">
                            <Label className="text-lg">Категория</Label>
                            <Select>
                                <SelectTrigger className="cursor-pointer">
                                    <SelectValue placeholder="Выберите локацию" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>{/*  <SelectItem value="price">Минск</SelectItem> */}</SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label className="text-lg">Тип</Label>
                            <Select>
                                <SelectTrigger className="cursor-pointer">
                                    <SelectValue placeholder="Выберите локацию" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>{/*  <SelectItem value="price">Минск</SelectItem> */}</SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <div className="flex flex-col gap-2">
                            <Label className="text-lg">Локация</Label>
                            <Select>
                                <SelectTrigger className="cursor-pointer">
                                    <SelectValue placeholder="Выберите локацию" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>{/*  <SelectItem value="price">Минск</SelectItem> */}</SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label className="text-lg">Регион</Label>
                            <Select>
                                <SelectTrigger className="cursor-pointer">
                                    <SelectValue placeholder="Выберите регион" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>{/*  <SelectItem value="price">Минск</SelectItem> */}</SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 text-center" style={{ flex: '50%' }}>
                    <Label className="text-lg">Изображения</Label>
                    <FileUpload.Root accept="image/*" value={images} onValueChange={setImages} maxFiles={8} multiple>
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
                            {images.map((file) => (
                                <FileUpload.Item
                                    key={file.name}
                                    value={file}
                                    className="flex justify-center w-48 sm:w-96"
                                >
                                    <FileUpload.ItemPreview className="h-full w-full" />
                                    <FileUpload.ItemDelete className="w-full h-full absolute right-0" />
                                </FileUpload.Item>
                            ))}
                        </FileUpload.List>
                        <FileUpload.Clear />
                    </FileUpload.Root>
                    <Button className="self-start cursor-pointer">Создать</Button>
                </div>
            </div>
        </div>
    );
}
