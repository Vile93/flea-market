import { Card, CardContent } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';

export function Offer() {
    return (
        <Card>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    <div className="w-32 aspect-square rounded-xl bg-black dark:bg-white"></div>
                    <div className="flex flex-col justify-between">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <div className="font-bold text-xl">Заголовок</div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <EllipsisVertical className="cursor-pointer" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem className="cursor-pointer">Редактировать</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">Поднять</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">Удалить</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="font-bold text-2xl">400р</div>
                        </div>
                        <div>
                            <div className="text-sm">Локация</div>
                            <div className="text-sm">Состояние: выставлено</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
