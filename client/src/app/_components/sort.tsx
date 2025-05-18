import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OFFER_ORDERS } from '@/constants/offer.constant';
import React, { SetStateAction } from 'react';

interface SortProps extends React.HTMLAttributes<HTMLDivElement> {
    setSort: React.Dispatch<SetStateAction<{ orderField: string; orderDirection: 'asc' | 'desc' } | null>>;
    sort: { orderField: string; orderDirection: 'asc' | 'desc' } | null;
}

export function Sort({ sort, setSort, ...props }: SortProps) {
    const onValueChange = (value: string) => {
        const order = OFFER_ORDERS.find((order) => order.value === value)!;
        console.log(order, sort);
        setSort({
            orderField: order.field,
            orderDirection: order.direction,
        });
    };
    const value = sort
        ? OFFER_ORDERS.find((order) => order.direction === sort.orderDirection && order.field === sort.orderField)!
              .value
        : '';
    console.log(sort, value);
    return (
        <div {...props}>
            <Select onValueChange={onValueChange} value={value}>
                <SelectTrigger className="w-[180px] py-6">
                    <SelectValue placeholder="Тип сортировки" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {OFFER_ORDERS.map((order) => (
                            <SelectItem className="cursor-pointer" key={order.value} value={order.value}>
                                {order.russianName}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
