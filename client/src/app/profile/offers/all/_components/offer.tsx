import { Card, CardContent } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { IMAGE_API } from '@/constants/api.constant';
import { OfferUser } from '@/types/offer.interface';
import { PriceType } from '@/types/price-type.enum';
import { CameraOff, EllipsisVertical } from 'lucide-react';
import React from 'react';

interface OfferProps {
    offer: OfferUser;
    setDeleteOffer: React.Dispatch<React.SetStateAction<{ id: string }[] | null>>;
}

export function Offer({ offer, setDeleteOffer }: OfferProps) {
    const deleteHandle = () => {
        setDeleteOffer([{ id: String(offer.id) }]);
    };
    return (
        <Card>
            <CardContent>
                <div className="flex flex-wrap gap-8">
                    <>
                        {offer.OfferImages.length === 0 ? (
                            <div className="relative w-32 h-32">
                                <div className="aspect-square  bg-gray-500 opacity-20 dark:opacity-50 dark:bg-white rounded-xl"></div>
                                <CameraOff className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 dark:opacity-80 w-8 h-8" />
                            </div>
                        ) : null}
                        {offer.OfferImages.length !== 0 ? (
                            <div className="w-32 h-32">
                                <img
                                    className="w-full aspect-square object-cover rounded-xl"
                                    src={`${IMAGE_API}/${offer.OfferImages[0].link}`}
                                />
                            </div>
                        ) : null}
                    </>
                    <div className="flex flex-col justify-between">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <div className="font-bold text-xl">Заголовок</div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <EllipsisVertical className="cursor-pointer" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {/*  <DropdownMenuItem className="cursor-pointer">Редактировать</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">Поднять</DropdownMenuItem> */}
                                        <DropdownMenuItem className="cursor-pointer" onClick={deleteHandle}>
                                            Удалить
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <>
                                {offer.price_type === PriceType.PAY ? (
                                    <div className="font-bold text-2xl">{offer.price} BYN</div>
                                ) : null}
                                {offer.price_type === PriceType.CONTRACT ? (
                                    <div className="font-bold text-2xl">Договорная</div>
                                ) : null}
                                {offer.price_type === PriceType.FREE ? (
                                    <div className="font-bold text-2xl">Бесплатно</div>
                                ) : null}
                            </>
                        </div>
                        <div>
                            <div className="text-sm">{offer.region_ref.name}</div>
                            <div className="text-sm">Состояние: {offer.status}</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
