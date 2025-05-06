'use client';

import { Category } from '@/app/profile/offers/create/_components/category';
import { Description } from '@/app/profile/offers/create/_components/description';
import { State } from '@/app/profile/offers/create/_components/state';
import { Title } from '@/app/profile/offers/create/_components/title';
import { TypeOfPrice } from '@/app/profile/offers/create/_components/type-of-price';
import { Type } from '@/app/profile/offers/create/_components/type';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { UploadImage } from '@/app/profile/offers/create/_components/upload-image';
import { Region } from '@/app/profile/offers/create/_components/region';
import { Location } from '@/app/profile/offers/create/_components/location';

export function CreateForm() {
    const [typeOfPrice, setTypeOfPrice] = useState<string | null>('price');
    const [images, setImages] = useState<File[]>([]);
    return (
        <div className="flex flex-col gap-2">
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <Title />
                    <Description />
                    <TypeOfPrice typeOfPrice={typeOfPrice} setTypeOfPrice={setTypeOfPrice} />
                    <State />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 flex-wrap">
                        <Category />
                        <Type />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <Location />
                        <Region />
                    </div>
                </div>
                <div className="flex flex-col gap-2 text-center" style={{ flex: '50%' }}>
                    <UploadImage images={images} setImages={setImages} />
                    <Button className="self-start cursor-pointer">Создать</Button>
                </div>
            </div>
        </div>
    );
}
