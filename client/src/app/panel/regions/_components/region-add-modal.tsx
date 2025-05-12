'use client';

import { PANEL_RELOAD_TABLE_REASON } from '@/constants/panel-reload-table-reason.constant';
import { createRegion } from '@/api/region.api';
import { PanelReloadTableContext } from '@/contexts/panel-reload-table.context';
import { useFetch } from '@/hooks/use-fetch.hook';
import { IMessage } from '@/types/message.interface';
import { CreateRegion, Region } from '@/types/region.interface';
import { regionSchema } from '@/validators/region.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormError } from '@/components/form-error';
import DataTableModalFooter from '@/components/table/data-table-modal-footer';

interface RegionAddModalProps {
    setIsOpenAddModal?: Dispatch<SetStateAction<boolean>>;
}

export default function RegionAddModal({ setIsOpenAddModal }: RegionAddModalProps) {
    const panelReloadTableContext = useContext(PanelReloadTableContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateRegion>({
        resolver: zodResolver(regionSchema),
    });
    const createFetch = useFetch<IMessage | Region, CreateRegion>(createRegion);
    const onSubmit: SubmitHandler<CreateRegion> = (data) => {
        createFetch.setNewArgs([data]);
    };

    useEffect(() => {
        if (createFetch.newArgs) {
            createFetch.fetchData(true);
        }
    }, [createFetch.newArgs]);

    useEffect(() => {
        if (createFetch.isSuccessCompleted && createFetch.statusCode === 201) {
            toast.success('Регион успешно добавлен');
            setIsOpenAddModal?.(false);
            panelReloadTableContext?.reload(PANEL_RELOAD_TABLE_REASON.ADD);
        } else if (createFetch.isSuccessCompleted && createFetch.data && 'message' in createFetch.data) {
            toast.error(createFetch.data.message);
            setIsOpenAddModal?.(false);
            panelReloadTableContext?.reload();
        } else if (createFetch.isSuccessCompleted && createFetch.statusCode !== 201) {
            toast.error('Ошибка при добавлении региона');
            setIsOpenAddModal?.(false);
            panelReloadTableContext?.reload();
        }
    }, [createFetch.isSuccessCompleted]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="text-white text-lg">
                        Название
                    </Label>
                    <Input id="name" type="text" placeholder="Название" {...register('name')} />
                    <FormError error={errors.name?.message} className="mt-2" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="location_id" className="text-white text-lg">
                        Айди локации
                    </Label>
                    <Input
                        id="location_id"
                        type="number"
                        placeholder="Айди локации"
                        {...register('location_id', {
                            valueAsNumber: true,
                        })}
                    />
                    <FormError error={errors.location_id?.message} className="mt-2" />
                </div>
            </div>
            <DataTableModalFooter setIsOpenModal={setIsOpenAddModal} textButton="Сохранить" />
        </form>
    );
}
