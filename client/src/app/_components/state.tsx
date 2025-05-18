import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { OFFER_STATES } from '@/constants/offer.constant';
import { OfferType } from '@/types/offer-type.enum';
import React from 'react';

interface StateProps {
    state: OfferType | null;
    setState: React.Dispatch<React.SetStateAction<OfferType | null>>;
}

export function State({ setState, state }: StateProps) {
    return (
        <Card className={`bg-transparent`}>
            <CardContent>
                <div className="flex gap-4">
                    {OFFER_STATES.map((s) => (
                        <Button
                            className={`${s.value === state ? '' : 'bg-transparent'} cursor-pointer`}
                            variant={'secondary'}
                            key={s.value}
                            onClick={() => {
                                setState(s.value !== state ? s.value : null);
                            }}
                        >
                            {s.russianName}
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
