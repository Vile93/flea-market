import { OfferCarousel } from '@/app/offers/[id]/_components/offer-carousel';
import { Card, CardContent } from '@/components/ui/card';
import { IMAGE_AVA_API } from '@/constants/api.constant';
import { OfferFind } from '@/types/offer.interface';
import { PriceType } from '@/types/price-type.enum';
import { User } from '@/types/user.interface';
import { CameraOff } from 'lucide-react';

interface OfferInfoProps {
    data: OfferFind & { user_ref: Pick<User, 'avatar_path' | 'phone' | 'username' | 'avatar_path'> };
}

export function OfferInfo({ data }: OfferInfoProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-3/4 w-full sm:w-3/4">
                    <OfferCarousel offerImages={data.OfferImages} />
                </div>
                <div className="flex-1/4 flex flex-col">
                    <div>
                        <div className="text-2xl font-medium">{data.title}</div>
                        <div>
                            {data.price_type === PriceType.FREE ? (
                                <div className="text-xl font-bold">Беслпатно</div>
                            ) : null}
                            {data.price_type === PriceType.CONTRACT ? (
                                <div className="text-xl font-bold">Договорная</div>
                            ) : null}
                            {data.price_type === PriceType.PAY ? (
                                <div className="text-xl font-bold">{data.price} BYN</div>
                            ) : null}
                        </div>
                        <div>{data.region_ref.name}</div>
                        <div>{data.type_ref.name}</div>
                    </div>
                    <Card className="mt-4">
                        <CardContent>
                            <div className="flex items-center gap-4">
                                {data.user_ref.avatar_path ? (
                                    <div className="w-16 h-16">
                                        <img
                                            className="object-cover rounded-xl h-full"
                                            src={`${IMAGE_AVA_API}/${data.user_ref.avatar_path}`}
                                        />
                                    </div>
                                ) : null}
                                {!data.user_ref.avatar_path ? (
                                    <div className="relative w-16 h-16">
                                        <div className="aspect-square  bg-gray-500 opacity-20 dark:opacity-50 dark:bg-white rounded-xl"></div>
                                        <CameraOff className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 dark:opacity-80 w-8 h-8" />
                                    </div>
                                ) : null}
                                <div>
                                    <div>{data.user_ref.username}</div>
                                    <div>{data.user_ref.phone}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div>
                <div className="text-xl font-bold mt-4">Описание</div>
                <div>{data.description}</div>
            </div>
        </div>
    );
}
