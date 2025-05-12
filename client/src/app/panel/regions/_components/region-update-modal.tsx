import { SetStateAction, useEffect } from 'react';

import { updateRegion } from '@/api/region.api';
import { FormError } from '@/components/form-error';
import { useContext } from 'react';
import DataTableModalFooter from '@/components/table/data-table-modal-footer';
import { Input } from '@/components/ui/input';
import { SubmitHandler } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { PanelReloadTableContext } from '@/contexts/panel-reload-table.context';
import { useFetch } from '@/hooks/use-fetch.hook';
import { IMessage } from '@/types/message.interface';
import { CreateRegion, Region, UpdateRegion } from '@/types/region.interface';
import { regionSchema } from '@/validators/region.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface RegionUpdateModalProps {
    setIsOpenUpdateModal?: Dispatch<SetStateAction<boolean>>;
    id?: string;
    data?: Region;
}

export default function RegionUpdateModal({ data, id, setIsOpenUpdateModal }: RegionUpdateModalProps) {
    const panelReloadTableContext = useContext(PanelReloadTableContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateRegion>({
        resolver: zodResolver(regionSchema),
    });
    const updateFetch = useFetch<IMessage | Region, UpdateRegion & { id: string }>(updateRegion);
    const onSubmit: SubmitHandler<UpdateRegion> = (data) => {
        updateFetch.setNewArgs([{ ...data, id: id! }]);
    };
    useEffect(() => {
        if (updateFetch.newArgs) {
            updateFetch.fetchData(true);
        }
    }, [updateFetch.newArgs]);
    useEffect(() => {
        if (updateFetch.isSuccessCompleted && updateFetch.statusCode === 200) {
            toast.success('Локация успешно обновлена');
            setIsOpenUpdateModal?.(false);
            panelReloadTableContext?.reload();
        } else if (updateFetch.isSuccessCompleted && updateFetch.data && 'message' in updateFetch.data) {
            toast.error(updateFetch.data.message);
            setIsOpenUpdateModal?.(false);
            panelReloadTableContext?.reload();
        } else if (updateFetch.isSuccessCompleted && updateFetch.statusCode !== 200) {
            toast.error('Ошибка при обновлении локации');
            setIsOpenUpdateModal?.(false);
            panelReloadTableContext?.reload();
        }
    }, [updateFetch.isSuccessCompleted]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="text-white text-lg">
                        Название
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Название"
                        {...register('name')}
                        defaultValue={data?.name}
                    />
                    <FormError error={errors.name?.message} className="mt-2" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="location_id" className="text-white text-lg">
                        Локация
                    </Label>
                    <Input
                        id="location_id"
                        type="number"
                        placeholder="Айди локации"
                        defaultValue={data?.location_id}
                        {...register('location_id', {
                            valueAsNumber: true,
                        })}
                    />
                    <FormError error={errors.location_id?.message} className="mt-2" />
                </div>
            </div>
            <DataTableModalFooter setIsOpenModal={setIsOpenUpdateModal} textButton="Обновить" />
        </form>
    );
}
