import BlockInfo from '@/app/panel/offers-on-moderation/[id]/_components/block-info';
import VerdictForm from '@/app/panel/offers-on-moderation/[id]/_components/verdict-form';
import { IMAGE_API } from '@/constants/api.constant';
import { OfferModerateWithImages } from '@/types/offer.interface';

interface OfferInfoProps {
    data: OfferModerateWithImages;
}

export default function OfferInfo({ data }: OfferInfoProps) {
    return (
        <div>
            <div className="text-2xl font-bold my-4">Информация про объявление</div>
            <BlockInfo fieldName={'Заголовок'} fieldValue={data.title} />
            <BlockInfo fieldName={'Описание'} fieldValue={data.description} />
            <BlockInfo fieldName="Айди пользователя" fieldValue={data.user_id} />
            <BlockInfo fieldName="Состояние продукта" fieldValue={data.type} />
            <BlockInfo fieldName="Тип цены" fieldValue={data.price_type} />
            <BlockInfo fieldName="Цена" fieldValue={data.price} />
            <BlockInfo fieldName="Название региона" fieldValue={data.region_ref.name} />
            <BlockInfo fieldName="Тип продукта" fieldValue={data.type_ref.name} />
            {data.OfferImages.length !== 0 ? (
                <div>
                    <div className="font-bold text-lg">Изображения</div>
                    <div className="flex flex-wrap gap-4">
                        {data.OfferImages.toSorted((a, b) => a.order - b.order).map((image, index) => (
                            <img
                                src={`${IMAGE_API}/${image.link}`}
                                className="rounded-xl h-96 w-auto object-cover"
                                key={index}
                            />
                        ))}
                    </div>
                </div>
            ) : null}
            <VerdictForm id={String(data.id)} />
        </div>
    );
}
