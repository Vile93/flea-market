'use client';

import { TreeDataItem, TreeView } from '@/components/tree-view';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from '@/components/ui/select';
import { MapPin, Search } from 'lucide-react';
import styles from '../style.module.css';

export function Filter() {
    const data: TreeDataItem[] = [
        {
            id: '1',
            name: 'Item 1',
            children: [
                {
                    id: '2',
                    name: 'Item 1.1',
                    children: [
                        {
                            id: '3',
                            name: 'Item 1.1.1',
                        },
                        {
                            id: '4',
                            name: 'Item 1.1.2',
                        },
                    ],
                },
                {
                    id: '5',
                    name: 'Item 1.2',
                },
            ],
        },
        {
            id: '6',
            name: 'Item 2 (draggable)',
            draggable: true,
        },
    ];
    /*   const [selectedSort, setSelectedSort] = useState<{
        type: string;
        isAsc: boolean;
    } | null>(null); */
    return (
        <>
            <div className={`${styles.filter} mt-16`}>
                <div className={`${styles.filters} sticky top-2`}>
                    <Card className={`${styles.categories} bg-transparent`}>
                        <CardContent>
                            <TreeView data={data} onSelectChange={(e) => console.log(e)} />
                        </CardContent>
                    </Card>
                    <Card className={`${styles.price} bg-transparent my-2`}>
                        <CardContent>
                            <div className="flex gap-2">
                                <div className="relative">
                                    <div className="absolute top-2 text-sm left-4 text-md select-none pointer-events-none">
                                        От
                                    </div>
                                    <Input className="pl-10" type="number" />
                                </div>
                                <div className="relative">
                                    <div className="absolute top-2 text-sm left-4 text-md select-none pointer-events-none">
                                        До
                                    </div>
                                    <Input className="pl-10" type="number" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className={`${styles.state} bg-transparent`}>
                        <CardContent>
                            <div className="flex gap-4">
                                <Button className="cursor-pointer bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-transparent">
                                    новое
                                </Button>
                                <Button className="cursor-pointer bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-transparent">
                                    б/у
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    <div className={`${styles.find} flex flex-col`}>
                        <Button className="mt-2 cursor-pointer">Найти</Button>
                        <Button className="mt-2 cursor-pointer" variant={'destructive'}>
                            Сбросить
                        </Button>
                    </div>
                </div>
                <div className={`${styles.sort}`}>
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
                <div className={`${styles.search} relative`}>
                    <Input className="pr-12 py-6!" placeholder="Поиск объявлений" />
                    <Search className="absolute right-2 top-3" />
                </div>
                <div className={`${styles.offers} self-start`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                        {Array.from({ length: 60 }, () => (
                            <div key={Math.random()}>
                                <div className="aspect-square w-full bg-black dark:bg-white rounded-xl"></div>
                                <div className="mt-2">Заголовок</div>
                                <div className="flex gap-2 text-sm items-center">
                                    <MapPin width={16} /> Минская, город
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
