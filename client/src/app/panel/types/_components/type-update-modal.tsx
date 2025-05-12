import { FormError } from '@/components/form-error';
import DataTableModalFooter from '@/components/table/data-table-modal-footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useContext, useEffect } from 'react';
import { SetStateAction } from 'react';
import { Dispatch } from 'react';
import { CreateType, Type, UpdateType } from '@/types/type.interface';
import { PanelReloadTableContext } from '@/contexts/panel-reload-table.context';
import { typeSchema } from '@/validators/type.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateType } from '@/api/type.api';
import { IMessage } from '@/types/message.interface';
import { useFetch } from '@/hooks/use-fetch.hook';
import { toast } from 'sonner';

interface RegionUpdateModalProps {
    setIsOpenUpdateModal?: Dispatch<SetStateAction<boolean>>;
    id?: string;
    data?: Type;
}

export default function TypeUpdateModal({ data, id, setIsOpenUpdateModal }: RegionUpdateModalProps) {
    const panelReloadTableContext = useContext(PanelReloadTableContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateType>({
        resolver: zodResolver(typeSchema),
    });
    const updateFetch = useFetch<IMessage | Type, UpdateType & { id: string }>(updateType);
    const onSubmit: SubmitHandler<UpdateType> = (data) => {
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
                    <Label htmlFor="name" className="text-black dark:text-white text-lg">
                        Название
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Название"
                        defaultValue={data?.name}
                        {...register('name')}
                    />
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
                        defaultValue={data?.category_id}
                        {...register('category_id', {
                            valueAsNumber: true,
                        })}
                    />
                    <FormError error={errors.category_id?.message} className="mt-2" />
                </div>
            </div>
            <DataTableModalFooter setIsOpenModal={setIsOpenUpdateModal} textButton="Сохранить" />
        </form>
    );
}
