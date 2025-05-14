import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SortProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sort({ className, ...props }: SortProps) {
    return (
        <div {...props}>
            <Select>
                <SelectTrigger className="w-[180px] py-6">
                    <SelectValue placeholder="Тип сортировки" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem className="cursor-pointer" value="low_price">
                            Дешёвые
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="high_price">
                            Дорогие
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="new_date">
                            Новые объявления
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="old_date">
                            Старые объявления
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
