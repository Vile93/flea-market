import { Title } from '@/components/title';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import styles from './style.module.css';
import { Input } from '@/components/ui/input';
import { SendHorizontal } from 'lucide-react';

export default function Chats() {
    return (
        <>
            <Card className="mt-16">
                <CardHeader>
                    <div className="flex gap-2">
                        <div className="mt-6">
                            <div className="w-2xs mr-18">
                                <Title name="Чаты" />
                            </div>
                        </div>
                        <div className="grow-1">
                            <div className="w-full">
                                <Card>
                                    <CardContent>
                                        <div className="flex gap-2">
                                            <div className="w-12 h-12 dark:bg-white bg-black rounded"></div>
                                            <div className="flex flex-col justify-between">
                                                <div className="font-bold text-lg">Макар</div>
                                                <div className="text-sm">Был в сети 2 минуты назад</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <div className={`flex flex-col gap-2 ${styles.chat} pr-2 overflow-y-scroll`}>
                            {Array.from({ length: 10 }, () => (
                                <Card key={Math.random()}>
                                    <CardContent>
                                        <div className="flex gap-2 w-2xs items-center">
                                            <div className="w-16 h-16 bg-black dark:bg-white rounded-xl"></div>
                                            <div className="grow-1">
                                                <div className="flex gap-2 text-lg font-bold items-center">
                                                    <div>Имя</div>
                                                    <div>Фамилия</div>
                                                    <div className="grow-1 text-right text-sm font-normal">02:22</div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>WWWWW @@@@@</div>
                                                    <div className="w-6 h-6 text-sm  dark:bg-white dark:text-black bg-black text-white rounded-xl flex items-center justify-center">
                                                        <div className="font-bold">12</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <div className="grow-1">
                            <Card>
                                <CardContent className={`w-full flex flex-col grow-1 ${styles.chat}`}>
                                    <div className={`grow-1 w-full   justify-between flex flex-col`}>
                                        <div>
                                            <div>
                                                <Card className="w-1/2">
                                                    <CardContent>Сообщение другого чела</CardContent>
                                                </Card>
                                            </div>
                                            <div className="flex justify-end mt-2">
                                                <Card className=" w-1/2 dark:bg-blue-500 bg-blue-200">
                                                    <CardContent>Моё сообщение</CardContent>
                                                </Card>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <Input className="text-xl! py-8 pr-10" placeholder="Напишите сообщение" />
                                            <SendHorizontal className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
