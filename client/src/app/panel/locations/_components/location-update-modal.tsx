import { FormError } from '@/components/form-error';
import DataTableModalFooter from '@/components/table/data-table-modal-footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { PanelReloadTableContext } from '@/contexts/panel-reload-table.context';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateLocation, Location, UpdateLocation } from '@/types/location.interface';
import { updateLocation } from '@/api/location.api';
import { toast } from 'sonner';
import { useFetch } from '@/hooks/use-fetch.hook';
import { IMessage } from '@/types/message.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { locationSchema } from '../../../../validators/location.validator';

interface LocationUpdateModalProps {
    setIsOpenUpdateModal?: Dispatch<SetStateAction<boolean>>;
    id?: string;
    data?: Location;
}

export default function LocationUpdateModal({ id, setIsOpenUpdateModal, data }: LocationUpdateModalProps) {
    const panelReloadTableContext = useContext(PanelReloadTableContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateLocation>({
        resolver: zodResolver(locationSchema),
    });
    const updateFetch = useFetch<IMessage | Location, UpdateLocation & { id: string }>(updateLocation);
    const onSubmit: SubmitHandler<UpdateLocation> = (data) => {
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
        } else if (updateFetch.isSuccessCompleted && updateFetch.statusCode === 409) {
            toast.error('Локация с таким названием уже существует');
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
                <Label htmlFor="name" className="text-white text-lg">
                    Название
                </Label>
                <Input id="name" type="text" placeholder="Название" {...register('name')} defaultValue={data?.name} />
            </div>
            <FormError error={errors.name?.message} className="mt-2" />
            <DataTableModalFooter setIsOpenModal={setIsOpenUpdateModal} textButton="Обновить" />
        </form>
    );
}
