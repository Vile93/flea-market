import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useContext, useEffect, useState } from 'react';
import { useFetch } from '@/hooks/use-fetch.hook';
import { toast } from 'sonner';
import { PanelReloadTableContext } from '@/contexts/panel-reload-table.context';
import { Input } from '@/components/ui/input';
interface DataTableActionProps {
    id: string;
    deleteFetch: (id: string) => Promise<Response>;
}
export default function DataTableAction({ id, deleteFetch }: DataTableActionProps) {
    const panelReloadTableContext = useContext(PanelReloadTableContext);
    const fetchDeleteItem = useFetch(deleteFetch, id);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const onDeleteItem = () => {
        fetchDeleteItem.fetchData(true);
        setIsOpenDeleteModal(false);
    };
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);

    useEffect(() => {
        if (fetchDeleteItem.isCompleted) {
            if (fetchDeleteItem.statusCode === 200) {
                toast.success('Запись удалена успешно');
            } else {
                toast.error('Ошибка при удалении записи');
            }
            panelReloadTableContext?.reload();
        }
    }, [fetchDeleteItem.isCompleted]);
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Открыть меню</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Действия</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>
                        Скопировать ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsOpenEditModal(true)}>Редактировать</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsOpenDeleteModal(true)}>Удалить</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={isOpenDeleteModal} onOpenChange={setIsOpenDeleteModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Вы уверены что хотите удалить данную запись?</DialogTitle>
                        <DialogDescription>
                            Данное действие необратимо и удалит все связанные с ней данные.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            className="cursor-pointer"
                            variant="outline"
                            onClick={() => setIsOpenDeleteModal(false)}
                        >
                            Отменить
                        </Button>
                        <Button className="cursor-pointer" variant="destructive" onClick={onDeleteItem}>
                            Удалить
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={isOpenEditModal} onOpenChange={setIsOpenEditModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Редактировать</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        <Input type="text" placeholder="Название" />
                    </DialogDescription>
                    <DialogFooter>
                        <Button className="cursor-pointer" variant="outline" onClick={() => setIsOpenEditModal(false)}>
                            Отменить
                        </Button>
                        <Button className="cursor-pointer">Сохранить</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
