'use client';

import { Label } from '@/components/ui/label';
import { createType } from '@/api/type.api';
import { PANEL_RELOAD_TABLE_REASON } from '@/constants/panel-reload-table-reason.constant';
import { PanelReloadTableContext } from '@/contexts/panel-reload-table.context';
import { IMessage } from '@/types/message.interface';
import { CreateType, Type } from '@/types/type.interface';
import { typeSchema } from '@/validators/type.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { FormError } from '@/components/form-error';
import DataTableModalFooter from '@/components/table/data-table-modal-footer';
import { useFetch } from '@/hooks/use-fetch.hook';

interface TypeAddModalProps {
    setIsOpenAddModal?: Dispatch<SetStateAction<boolean>>;
}

export default function TypeAddModal({ setIsOpenAddModal }: TypeAddModalProps) {
    const panelReloadTableContext = useContext(PanelReloadTableContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateType>({
        resolver: zodResolver(typeSchema),
    });
    const createFetch = useFetch<IMessage | Type, CreateType>(createType);
    const onSubmit: SubmitHandler<CreateType> = (data) => {
        createFetch.setNewArgs([data]);
    };

    useEffect(() => {
        if (createFetch.newArgs) {
            createFetch.fetchData(true);
        }
    }, [createFetch.newArgs]);

    useEffect(() => {
        if (createFetch.isSuccessCompleted && createFetch.statusCode === 201) {
            toast.success('Тип успешно добавлен');
            setIsOpenAddModal?.(false);
            panelReloadTableContext?.reload(PANEL_RELOAD_TABLE_REASON.ADD);
        } else if (createFetch.isSuccessCompleted && createFetch.data && 'message' in createFetch.data) {
            toast.error(createFetch.data.message);
            setIsOpenAddModal?.(false);
            panelReloadTableContext?.reload();
        } else if (createFetch.isSuccessCompleted && createFetch.statusCode !== 201) {
            toast.error('Ошибка при добавлении типа');
            setIsOpenAddModal?.(false);
            panelReloadTableContext?.reload();
        }
    }, [createFetch.isSuccessCompleted]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="text-black dark:text-white text-lg">
                        Название
                    </Label>
                    <Input id="name" type="text" placeholder="Название" {...register('name')} />
                    <FormError error={errors.name?.message} className="mt-2" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="category_id" className="text-black dark:text-white text-lg">
                        Айди категории
                    </Label>
                    <Input
                        id="category_id"
                        type="number"
                        placeholder="Айди категории"
                        {...register('category_id', {
                            valueAsNumber: true,
                        })}
                    />
                    <FormError error={errors.category_id?.message} className="mt-2" />
                </div>
            </div>
            <DataTableModalFooter setIsOpenModal={setIsOpenAddModal} textButton="Сохранить" />
        </form>
    );
}
