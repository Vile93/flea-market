import { Input } from '@/components/ui/input';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TypeOfPriceProps {
    typeOfPrice: string | null;
    setTypeOfPrice: (value: string) => void;
}

export function TypeOfPrice({ typeOfPrice, setTypeOfPrice }: TypeOfPriceProps) {
    return (
        <div className="flex flex-col gap-2">
            <Label className="text-lg">Тип цены</Label>
            <Select defaultValue="price" onValueChange={(value) => setTypeOfPrice(value)}>
                <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Цена" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="price">Платно</SelectItem>
                        <SelectItem value="contract">Договорная</SelectItem>
                        <SelectItem value="free">Бесплатно</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            {typeOfPrice === 'price' ? <Input id="price" type="number" placeholder="0.99" min={0} /> : null}
        </div>
    );
}
