'use client';

import { createCategory } from '@/api/category.api';
import DataTableModalFooter from '@/components/table/data-table-modal-footer';
import { FormError } from '@/components/form-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PANEL_RELOAD_TABLE_REASON } from '@/constants/panel-reload-table-reason.constant';
import { PanelReloadTableContext } from '@/contexts/panel-reload-table.context';
import { useFetch } from '@/hooks/use-fetch.hook';
import { Category, CreateCategory } from '@/types/category.interface';
import { IMessage } from '@/types/message.interface';
import { categorySchema } from '@/validators/category.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface CategoryAddModalProps {
    setIsOpenAddModal?: Dispatch<SetStateAction<boolean>>;
}

export default function CategoryAddModal({ setIsOpenAddModal }: CategoryAddModalProps) {
    const panelReloadTableContext = useContext(PanelReloadTableContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateCategory>({
        resolver: zodResolver(categorySchema),
    });
    const createFetch = useFetch<IMessage | Category, CreateCategory>(createCategory);
    const onSubmit: SubmitHandler<CreateCategory> = (data) => {
        createFetch.setNewArgs([data]);
    };

    useEffect(() => {
        if (createFetch.newArgs) {
            createFetch.fetchData(true);
        }
    }, [createFetch.newArgs]);

    useEffect(() => {
        if (createFetch.isSuccessCompleted && createFetch.statusCode === 201) {
            toast.success('Категория успешно добавлена');
            setIsOpenAddModal?.(false);
            panelReloadTableContext?.reload(PANEL_RELOAD_TABLE_REASON.ADD);
        } else if (createFetch.isSuccessCompleted && createFetch.statusCode === 409) {
            toast.error('Категория с таким названием уже существует');
            setIsOpenAddModal?.(false);
            panelReloadTableContext?.reload();
        } else if (createFetch.isSuccessCompleted && createFetch.statusCode !== 201) {
            toast.error('Ошибка при добавлении категории');
            setIsOpenAddModal?.(false);
            panelReloadTableContext?.reload();
        }
    }, [createFetch.isSuccessCompleted]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-white text-lg">
                    Название
                </Label>
                <Input id="name" type="text" placeholder="Название" {...register('name')} />
                <FormError error={errors.name?.message} className="mt-2" />
            </div>
            <DataTableModalFooter setIsOpenModal={setIsOpenAddModal} textButton="Сохранить" />
        </form>
    );
}
