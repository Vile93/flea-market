import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { IMAGE_API } from '@/constants/api.constant';
import { OfferImage } from '@/types/offer.interface';
import { CameraOff } from 'lucide-react';

interface OfferCarouselProps {
    offerImages: OfferImage[];
}

export function OfferCarousel({ offerImages }: OfferCarouselProps) {
    return (
        <Carousel>
            <CarouselContent>
                {offerImages.map((image) => (
                    <CarouselItem key={image.id} className="flex justify-center">
                        <img className="w-128  object-cover rounded-xl" src={`${IMAGE_API}/${image.link}`} />
                    </CarouselItem>
                ))}
                {offerImages.length === 0 ? (
                    <CarouselItem>
                        <div className="mx-auto relative w-128">
                            <div className="aspect-square  bg-gray-500 opacity-20 dark:opacity-50 dark:bg-white rounded-xl"></div>
                            <CameraOff className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 dark:opacity-80 w-32 h-32" />
                        </div>
                    </CarouselItem>
                ) : null}
            </CarouselContent>
            {offerImages.length !== 0 ? (
                <>
                    <CarouselPrevious className="absolute left-16" />
                    <CarouselNext className="absolute right-16" />
                </>
            ) : null}
        </Carousel>
    );
}
