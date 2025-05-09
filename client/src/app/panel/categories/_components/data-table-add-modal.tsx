'use client';

import { createCategory } from '@/api/category-client.api';
import DataTableAddModalFooter from '@/app/panel/categories/_components/data-table-add-modal-footer';
import { FormError } from '@/components/form-error';
import { Input } from '@/components/ui/input';
import { PanelReloadTableContext } from '@/contexts/panel-reload-table.context';
import { useFetch } from '@/hooks/use-fetch.hook';
import { Category, CreateCategory } from '@/types/category.interface';
import { IMessage } from '@/types/message.interface';
import { categorySchema } from '@/validators/category.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type Inputs = {
    name: string;
};

interface DataTableAddModalProps {
    setIsOpenAddModal: Dispatch<SetStateAction<boolean>>;
}

export default function DataTableAddModal({ setIsOpenAddModal }: DataTableAddModalProps) {
    const panelReloadTableContext = useContext(PanelReloadTableContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(categorySchema),
    });
    const createCategoryFetch = useFetch<IMessage | Category, CreateCategory>(createCategory);
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        createCategoryFetch.setNewArgs([data]);
    };

    useEffect(() => {
        if (createCategoryFetch.newArgs) {
            createCategoryFetch.fetchData(true);
        }
    }, [createCategoryFetch.newArgs]);

    useEffect(() => {
        if (createCategoryFetch.isSuccessCompleted && createCategoryFetch.statusCode === 201) {
            toast.success('Категория успешно добавлена');
            setIsOpenAddModal(false);
            panelReloadTableContext?.reload();
        } else if (createCategoryFetch.isSuccessCompleted && createCategoryFetch.statusCode === 409) {
            toast.error('Категория с таким названием уже существует');
            setIsOpenAddModal(false);
            panelReloadTableContext?.reload();
        } else if (createCategoryFetch.isSuccessCompleted && createCategoryFetch.statusCode !== 201) {
            toast.error('Ошибка при добавлении категории');
            setIsOpenAddModal(false);
            panelReloadTableContext?.reload();
        }
    }, [createCategoryFetch.isSuccessCompleted]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input type="text" placeholder="Название" {...register('name')} />
            <FormError error={errors.name?.message} className="mt-2" />
            <DataTableAddModalFooter setIsOpenAddModal={setIsOpenAddModal} />
        </form>
    );
}
