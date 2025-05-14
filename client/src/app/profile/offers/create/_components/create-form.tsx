'use client';

import { Description } from '@/app/profile/offers/create/_components/description';
import { State } from '@/app/profile/offers/create/_components/state';
import { Title } from '@/app/profile/offers/create/_components/title';
import { TypeOfPrice } from '@/app/profile/offers/create/_components/type-of-price';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { UploadImage } from '@/app/profile/offers/create/_components/upload-image';
import { Category as ICategory } from '@/types/category.interface';
import { Region as IRegion } from '@/types/region.interface';
import { Type as IType } from '@/types/type.interface';
import { Location as ILocation } from '@/types/location.interface';
import { Category } from './category';
import { Type } from './type';
import { Location } from './location';
import { Region } from './region';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { offerSchema } from '@/validators/offer.validator';
import { z } from 'zod';

interface CreateFormProps {
    categories: (ICategory & { Type: IType[] })[];
    locations: (ILocation & { Region: IRegion[] })[];
}

export function CreateForm({ categories, locations }: CreateFormProps) {
    const [typeOfPrice, setTypeOfPrice] = useState<string | null>('price');
    const [images, setImages] = useState<File[]>([]);
    const [category, setCategory] = useState<string | null>(null);
    const [type, setType] = useState<string | null>(null);
    const [listOfTypes, setListOfTypes] = useState<IType[]>([]);
    const [location, setLocation] = useState<string | null>(null);
    const [region, setRegion] = useState<string | null>(null);
    const [listOfRegions, setListOfRegions] = useState<IRegion[]>([]);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<z.infer<typeof offerSchema>>({
        resolver: zodResolver(offerSchema),
    });

    const onSubmit: SubmitHandler<z.infer<typeof offerSchema>> = (data) => {
        console.log(data);
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2">
                    <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Title register={register} errors={errors} />
                            <Description register={register} errors={errors} />
                            <TypeOfPrice
                                typeOfPrice={typeOfPrice}
                                setTypeOfPrice={setTypeOfPrice}
                                register={register}
                                errors={errors}
                                control={control}
                            />
                            <State register={register} errors={errors} control={control} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 flex-wrap w-96">
                                <Category
                                    category={category}
                                    categories={categories}
                                    setCategory={setCategory}
                                    setListOfTypes={setListOfTypes}
                                    setType={setType}
                                />
                                <Type type={type} listOfTypes={listOfTypes} setType={setType} />
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <Location
                                    location={location}
                                    locations={locations}
                                    setLocation={setLocation}
                                    setListOfRegions={setListOfRegions}
                                    setRegion={setRegion}
                                />
                                <Region region={region} listOfRegions={listOfRegions} setRegion={setRegion} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 text-center" style={{ flex: '50%' }}>
                            <UploadImage images={images} setImages={setImages} />
                            <Button className="self-start cursor-pointer">Создать</Button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
