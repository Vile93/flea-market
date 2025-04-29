'use client';

import { TreeDataItem, TreeView } from '@/components/tree-view';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectLabel,
} from '@/components/ui/select';
import {
    ArrowDown,
    ArrowUp,
    Calendar,
    CalendarArrowUp,
    ChartColumnIncreasing,
    DollarSign,
    MapPin,
    Receipt,
    Search,
} from 'lucide-react';
import { useContext, useState } from 'react';
import styles from './style.module.css';

export default function Home() {
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
    const data2: TreeDataItem[] = [
        {
            id: 'new',
            name: 'новое',
        },
        {
            id: 'old',
            name: 'б/у',
            children: [
                {
                    id: '4',
                    name: 'Идеал',
                },
                {
                    id: '3',
                    name: 'Хорошо',
                },
                {
                    id: '2',
                    name: 'С дефектом',
                },
                {
                    id: '1',
                    name: 'Неисправно',
                },
            ],
        },
    ];
    const [selectedSort, setSelectedSort] = useState<{
        type: string;
        isAsc: boolean;
    } | null>(null);
    return (
        <>
            {/*     <div className="flex">
                <div className="flex gap-4">
                    <div className="w-72">
                        <Card className="bg-transparent my-2">
                            <CardContent>
                                <TreeView data={data} onSelectChange={(e) => console.log(e)} />
                            </CardContent>
                        </Card>
                        <Card className="bg-transparent my-2">
                            <CardContent>
                                <div className="flex flex-col gap-4">
                                    <Button
                                        className={`justify-start cursor-pointer ${
                                            selectedSort?.type === 'price'
                                                ? 'bg-black text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-white'
                                                : 'bg-transparent text-black hover:bg-transparent dark:bg-transparent dark:text-white dark:hover:bg-transparent '
                                        }`}
                                        onClick={() => {
                                            if (selectedSort?.type === 'price') {
                                                setSelectedSort((prev) => ({
                                                    type: 'price',
                                                    isAsc: !prev?.isAsc,
                                                }));
                                            } else {
                                                setSelectedSort({
                                                    type: 'price',
                                                    isAsc: false,
                                                });
                                            }
                                        }}
                                    >
                                        <DollarSign /> по цене{' '}
                                        {selectedSort?.type === 'price' && selectedSort.isAsc === false ? (
                                            <ArrowDown />
                                        ) : (
                                            <ArrowUp />
                                        )}
                                    </Button>
                                    <Button
                                        className={`justify-start cursor-pointer ${
                                            selectedSort?.type === 'date'
                                                ? 'bg-black text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-white'
                                                : 'bg-transparent text-black hover:bg-transparent dark:bg-transparent dark:text-white dark:hover:bg-transparent '
                                        }`}
                                        onClick={() => {
                                            if (selectedSort?.type === 'date') {
                                                setSelectedSort((prev) => ({
                                                    type: 'date',
                                                    isAsc: !prev?.isAsc,
                                                }));
                                            } else {
                                                setSelectedSort({
                                                    type: 'date',
                                                    isAsc: false,
                                                });
                                            }
                                        }}
                                    >
                                        <Calendar /> по дате
                                        {selectedSort?.type === 'date' && selectedSort.isAsc === false ? (
                                            <ArrowDown />
                                        ) : (
                                            <ArrowUp />
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-transparent my-2">
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
                        <Card className="bg-transparent">
                            <CardContent>
                                <TreeView data={data2} />
                            </CardContent>
                        </Card>
                        <div className="flex flex-col">
                            <Button className="mt-2 cursor-pointer">Поиск объявлений</Button>
                            <Button className="mt-2 cursor-pointer" variant={'destructive'}>
                                Сбросить
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-center relative">
                    <div className="grow-1">
                        <Input className="pr-12" placeholder="Поиск объявлений" />
                        <Search className="absolute right-2" />
                    </div>
                    <div>Объявления</div>
                </div>
            </div> */}
            <div className={`${styles.filter}`}>
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
                {/* <Card className={`${styles.sort} bg-transparent my-2 h-0`}>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            <Button
                                className={`justify-start cursor-pointer ${
                                    selectedSort?.type === 'price'
                                        ? 'bg-black text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-white'
                                        : 'bg-transparent text-black hover:bg-transparent dark:bg-transparent dark:text-white dark:hover:bg-transparent '
                                }`}
                                onClick={() => {
                                    if (selectedSort?.type === 'price') {
                                        setSelectedSort((prev) => ({
                                            type: 'price',
                                            isAsc: !prev?.isAsc,
                                        }));
                                    } else {
                                        setSelectedSort({
                                            type: 'price',
                                            isAsc: false,
                                        });
                                    }
                                }}
                            >
                                <DollarSign /> по цене{' '}
                                {selectedSort?.type === 'price' && selectedSort.isAsc === false ? (
                                    <ArrowDown />
                                ) : (
                                    <ArrowUp />
                                )}
                            </Button>
                            <Button
                                className={`justify-start cursor-pointer ${
                                    selectedSort?.type === 'date'
                                        ? 'bg-black text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-white'
                                        : 'bg-transparent text-black hover:bg-transparent dark:bg-transparent dark:text-white dark:hover:bg-transparent '
                                }`}
                                onClick={() => {
                                    if (selectedSort?.type === 'date') {
                                        setSelectedSort((prev) => ({
                                            type: 'date',
                                            isAsc: !prev?.isAsc,
                                        }));
                                    } else {
                                        setSelectedSort({
                                            type: 'date',
                                            isAsc: false,
                                        });
                                    }
                                }}
                            >
                                <Calendar /> по дате
                                {selectedSort?.type === 'date' && selectedSort.isAsc === false ? (
                                    <ArrowDown />
                                ) : (
                                    <ArrowUp />
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card> */}
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
                            <div>
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
