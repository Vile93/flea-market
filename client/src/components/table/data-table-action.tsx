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
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useFetch } from '@/hooks/use-fetch.hook';
import { toast } from 'sonner';
import { PanelReloadTableContext } from '@/contexts/panel-reload-table.context';
import { PANEL_RELOAD_TABLE_REASON } from '@/constants/panel-reload-table-reason.constant';
interface DataTableActionProps<T> {
    id: string;
    deleteFetch: (id: string) => Promise<Response>;
    updateModal: React.ReactElement<{ setIsOpenUpdateModal?: Dispatch<SetStateAction<boolean>>; id: string; data?: T }>;
    data?: T;
}
export default function DataTableAction<T>({ id, deleteFetch, updateModal, data }: DataTableActionProps<T>) {
    const panelReloadTableContext = useContext(PanelReloadTableContext);
    const fetchDeleteItem = useFetch(deleteFetch, id);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const onDeleteItem = () => {
        fetchDeleteItem.fetchData(true);
        setIsOpenDeleteModal(false);
    };
    const [isOpenEditModal, setIsOpenUpdateModal] = useState(false);

    useEffect(() => {
        if (fetchDeleteItem.isCompleted) {
            if (fetchDeleteItem.statusCode === 200) {
                toast.success('Запись удалена успешно');
                panelReloadTableContext?.reload(PANEL_RELOAD_TABLE_REASON.DELETE);
            } else {
                toast.error('Ошибка при удалении записи');
                panelReloadTableContext?.reload();
            }
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
                    <DropdownMenuItem onClick={() => setIsOpenUpdateModal(true)}>Редактировать</DropdownMenuItem>
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
            <Dialog open={isOpenEditModal} onOpenChange={setIsOpenUpdateModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl">Редактировать</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">{React.cloneElement(updateModal, { setIsOpenUpdateModal, id, data })}</div>
                </DialogContent>
            </Dialog>
        </>
    );
}
