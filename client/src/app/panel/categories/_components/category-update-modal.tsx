import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from '@/validators/category.validator';
import { Category, CreateCategory, UpdateCategory } from '@/types/category.interface';
import { IMessage } from '@/types/message.interface';
import { useFetch } from '@/hooks/use-fetch.hook';
import { updateCategory } from '@/api/category.api';
import { FormError } from '@/components/form-error';
import { Input } from '@/components/ui/input';
import DataTableModalFooter from '@/components/table/data-table-modal-footer';
import { toast } from 'sonner';
import { PanelReloadTableContext } from '@/contexts/panel-reload-table.context';
import { Label } from '@/components/ui/label';

interface CategoryUpdateModalProps {
    setIsOpenUpdateModal?: Dispatch<SetStateAction<boolean>>;
    id?: string;
    data?: Category;
}

export default function CategoryUpdateModal({ id, setIsOpenUpdateModal, data }: CategoryUpdateModalProps) {
    const panelReloadTableContext = useContext(PanelReloadTableContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateCategory>({
        resolver: zodResolver(categorySchema),
    });
    const updateFetch = useFetch<IMessage | Category, UpdateCategory & { id: string }>(updateCategory);
    const onSubmit: SubmitHandler<UpdateCategory> = (data) => {
        updateFetch.setNewArgs([{ ...data, id: id! }]);
    };
    useEffect(() => {
        if (updateFetch.newArgs) {
            updateFetch.fetchData(true);
        }
    }, [updateFetch.newArgs]);
    useEffect(() => {
        if (updateFetch.isSuccessCompleted && updateFetch.statusCode === 200) {
            toast.success('Категория успешно обновлена');
            setIsOpenUpdateModal?.(false);
            panelReloadTableContext?.reload();
        } else if (updateFetch.isSuccessCompleted && updateFetch.statusCode === 409) {
            toast.error('Категория с таким названием уже существует');
            setIsOpenUpdateModal?.(false);
            panelReloadTableContext?.reload();
        } else if (updateFetch.isSuccessCompleted && updateFetch.statusCode !== 200) {
            toast.error('Ошибка при обновлении категории');
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
