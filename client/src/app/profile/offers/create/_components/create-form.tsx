'use client';

import { Description } from '@/app/profile/offers/create/_components/description';
import { State } from '@/app/profile/offers/create/_components/state';
import { Title } from '@/app/profile/offers/create/_components/title';
import { TypeOfPrice } from '@/app/profile/offers/create/_components/type-of-price';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
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
import { OfferType } from '@/types/offer-type.enum';
import { PriceType } from '@/types/price-type.enum';
import { useFetch } from '@/hooks/use-fetch.hook';
import { createOffer as createOfferApi } from '@/api/offer.api';
import { CreateOffer, Offer } from '@/types/offer.interface';
import { sendOfferImage as sendOfferImageApi } from '@/api/offer.api';
import { useRouter } from 'next/navigation';
interface CreateFormProps {
    categories: (ICategory & { Type: IType[] })[];
    locations: (ILocation & { Region: IRegion[] })[];
}

export function CreateForm({ categories, locations }: CreateFormProps) {
    const router = useRouter();
    const [typeOfPrice, setTypeOfPrice] = useState<string>(PriceType.PAY);
    const [images, setImages] = useState<File[]>([]);
    const [category, setCategory] = useState<string | null>(null);
    const [listOfTypes, setListOfTypes] = useState<IType[]>([]);
    const [location, setLocation] = useState<string | null>(null);
    const [listOfRegions, setListOfRegions] = useState<IRegion[]>([]);
    const [imagesLinks, setImagesLinks] = useState<string[]>([]);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm<z.infer<typeof offerSchema>>({
        resolver: zodResolver(offerSchema),
        defaultValues: {
            type: OfferType.NEW,
            price_type: PriceType.PAY,
        },
    });
    const createOffer = useFetch<Offer, CreateOffer>(createOfferApi);
    const sendOfferImage = useFetch<{ url: string }, FormData>(sendOfferImageApi);
    const onSubmit: SubmitHandler<z.infer<typeof offerSchema>> = (data) => {
        if (data.price_type !== PriceType.PAY) {
            data.price = undefined;
        }
        createOffer.setNewArgs([{ ...data, imagesLinks }]);
    };
    useEffect(() => {
        setValue('type_id', 0);
    }, [category]);
    useEffect(() => {
        setValue('region_id', 0);
    }, [location]);
    useEffect(() => {
        if (createOffer.newArgs) {
            createOffer.fetchData(true);
        }
    }, [createOffer.newArgs]);
    useEffect(() => {
        if (sendOfferImage.newArgs) {
            sendOfferImage.fetchData(true);
        }
    }, [sendOfferImage.newArgs]);
    useEffect(() => {
        if (sendOfferImage.isCompleted && sendOfferImage.statusCode === 201 && sendOfferImage.data?.url) {
            setImagesLinks([...imagesLinks, sendOfferImage.data?.url]);
        }
    }, [sendOfferImage.isCompleted]);
    useEffect(() => {
        if (createOffer.isCompleted && createOffer.statusCode === 201) {
            router.push(`/profile/offers/success/${createOffer.data?.id}`);
        }
    }, [createOffer.isCompleted]);
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
                            <State errors={errors} control={control} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 flex-wrap w-96">
                                <Category
                                    category={category}
                                    categories={categories}
                                    setCategory={setCategory}
                                    setListOfTypes={setListOfTypes}
                                />
                                <Type listOfTypes={listOfTypes} errors={errors} control={control} />
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <Location
                                    location={location}
                                    locations={locations}
                                    setLocation={setLocation}
                                    setListOfRegions={setListOfRegions}
                                />
                                <Region listOfRegions={listOfRegions} errors={errors} control={control} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 text-center" style={{ flex: '50%' }}>
                            <UploadImage
                                images={images}
                                setImages={setImages}
                                setSendOfferImageArgs={sendOfferImage.setNewArgs}
                                setImagesLinks={setImagesLinks}
                                isLoading={sendOfferImage.isLoading}
                            />
                            <Button className="self-start cursor-pointer" disabled={sendOfferImage.isLoading}>
                                Создать
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
