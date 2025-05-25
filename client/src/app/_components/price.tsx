import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { ChangeEvent } from 'react';

interface PriceProps {
    price: { priceFrom?: string; priceTo?: string } | null;
    setPrice: React.Dispatch<React.SetStateAction<{ priceFrom?: string; priceTo?: string } | null>>;
}

export function Price({ price, setPrice }: PriceProps) {
    const fromPriceChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setPrice({
            priceFrom: e.target.value,
            priceTo: price?.priceTo ?? undefined,
        });
    };
    const toPriceChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setPrice({
            priceFrom: price?.priceFrom ?? undefined,
            priceTo: e.target.value,
        });
    };
    return (
        <Card className={`bg-transparent my-2`}>
            <CardContent>
                <div className="flex gap-2">
                    <div className="relative">
                        <div className="absolute top-2 text-sm left-4 text-md select-none pointer-events-none">От</div>
                        <Input
                            className="pl-10"
                            type="number"
                            step={0.01}
                            value={price?.priceFrom || ''}
                            onChange={fromPriceChangeHandle}
                        />
                    </div>
                    <div className="relative">
                        <div className="absolute top-2 text-sm left-4 text-md select-none pointer-events-none">До</div>
                        <Input
                            className="pl-10"
                            type="number"
                            step={0.01}
                            value={price?.priceTo || ''}
                            onChange={toPriceChangeHandle}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
