'use client';

import { updateOfferOnModeration } from '@/api/offer.api';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { PANEL_ROUTES } from '@/constants/route.constant';
import { useFetch } from '@/hooks/use-fetch.hook';
import { OfferStatus } from '@/types/offer-status.enum';
import { Offer, OfferModerateUpdate } from '@/types/offer.interface';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface VerdictFormProps {
    id: string;
}

export default function VerdictForm({ id }: VerdictFormProps) {
    const [isDeclineOffer, setIsDeclineOffer] = useState<boolean>(false);
    const onCheckedChange = () => {
        setIsDeclineOffer((prev) => !prev);
    };
    const [declineMessage, setDeclineMessage] = useState<string>('');
    const onDeclineMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDeclineMessage(e.target.value);
    };
    const updateOffer = useFetch<Offer, OfferModerateUpdate & { id: string }>(updateOfferOnModeration);
    useEffect(() => {
        if (updateOffer.newArgs) {
            updateOffer.fetchData(true);
        }
    }, [updateOffer.newArgs]);
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateOffer.setNewArgs([
            {
                id,
                status: isDeclineOffer ? OfferStatus.REJECTED : OfferStatus.ACCEPTED,
                content: isDeclineOffer ? declineMessage : undefined,
            },
        ]);
    };
    const router = useRouter();
    useEffect(() => {
        if (updateOffer.statusCode === 200) {
            router.push(PANEL_ROUTES.MODERATOR.OFFERS);
            toast.success('Объявление было успешно промодерировано');
        }
    }, [updateOffer]);
    return (
        <>
            <div className="text-2xl font-bold my-4">Сделать вердикт</div>
            <form onSubmit={onSubmit}>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-center">
                        <Switch id="decline" onCheckedChange={onCheckedChange} />
                        <Label className="text-lg" htmlFor="decline">
                            Отклонить
                        </Label>
                    </div>
                    <div>
                        <Textarea
                            placeholder="Причина отклонения"
                            onChange={onDeclineMessageChange}
                            value={declineMessage}
                            disabled={!isDeclineOffer}
                            required
                        />
                    </div>
                    <div>
                        <Button type="submit" disabled={updateOffer.isLoading}>
                            Отправить
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
}
