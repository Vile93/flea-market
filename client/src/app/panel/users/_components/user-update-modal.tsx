'use client';

import { useContext, useEffect } from 'react';
import { updateUser } from '@/api/user.api';
import { PanelReloadTableContext } from '@/contexts/panel-reload-table.context';
import { useFetch } from '@/hooks/use-fetch.hook';
import { IMessage } from '@/types/message.interface';

import { UpdatePanelUser, User } from '@/types/user.interface';
import { userUpdateSchema } from '@/validators/user.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormError } from '@/components/form-error';
import DataTableModalFooter from '@/components/table/data-table-modal-footer';
import { SelectItem } from '@/components/ui/select';
import { SelectContent } from '@/components/ui/select';
import { SelectTrigger, SelectValue } from '@/components/ui/select';
import { Select } from '@/components/ui/select';
import { Roles } from '@/types/roles.enum';
import { SelectGroup } from '@radix-ui/react-select';

interface UserUpdateModalProps {
    setIsOpenUpdateModal?: Dispatch<SetStateAction<boolean>>;
    id?: string;
    data?: User;
}

export default function UserUpdateModal({ data, id, setIsOpenUpdateModal }: UserUpdateModalProps) {
    const panelReloadTableContext = useContext(PanelReloadTableContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<UpdatePanelUser>({
        resolver: zodResolver(userUpdateSchema),
    });
    const updateFetch = useFetch<IMessage | User, UpdatePanelUser & { id: string }>(updateUser);
    const onSubmit: SubmitHandler<UpdatePanelUser> = (data) => {
        const { surname, password, ...otherData } = data;
        updateFetch.setNewArgs([
            { ...otherData, password: password || undefined, surname: surname || undefined, id: id! },
        ]);
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
                <div className="flex gap-2 justify-between">
                    <div className="flex flex-col gap-2 flex-1/2">
                        <Label htmlFor="name" className="text-black dark:text-white text-lg">
                            Имя
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Имя"
                            defaultValue={data?.name}
                            {...register('name')}
                        />
                        <FormError error={errors.name?.message} className="mt-2" />
                    </div>
                    <div className="flex flex-col gap-2 flex-1/2">
                        <Label htmlFor="surname" className="text-black dark:text-white text-lg">
                            Фамилия
                        </Label>
                        <Input
                            id="surname"
                            type="text"
                            placeholder="Фамилия"
                            defaultValue={data?.surname ?? ''}
                            {...register('surname')}
                        />
                        <FormError error={errors.surname?.message} className="mt-2" />
                    </div>
                </div>
                <div className="flex gap-2 justify-between">
                    <div className="flex flex-col gap-2 flex-1/2">
                        <Label htmlFor="username" className="text-black dark:text-white text-lg">
                            Логин
                        </Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Логин"
                            defaultValue={data?.username}
                            {...register('username')}
                        />
                        <FormError error={errors.username?.message} className="mt-2" />
                    </div>
                    <div className="flex flex-col gap-2 flex-1/2">
                        <Label htmlFor="phone" className="text-black dark:text-white text-lg">
                            Телефон
                        </Label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="Телефон"
                            defaultValue={data?.phone}
                            {...register('phone')}
                        />
                        <FormError error={errors.phone?.message} className="mt-2" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="text-black dark:text-white text-lg">
                        Почта
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Почта"
                        defaultValue={data?.email}
                        {...register('email')}
                    />
                    <FormError error={errors.email?.message} className="mt-2" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="role" className="text-black dark:text-white text-lg">
                        Роль
                    </Label>
                    <div>
                        <Controller
                            name="role"
                            control={control}
                            defaultValue={data?.role}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Выбери роль" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem className="hidden" value={Roles.ROOT}>
                                                ROOT
                                            </SelectItem>
                                            <SelectItem value={Roles.ADMIN}>Админ</SelectItem>
                                            <SelectItem value={Roles.MODERATOR}>Модератор</SelectItem>
                                            <SelectItem value={Roles.USER}>Пользователь</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        ></Controller>
                    </div>
                    <FormError error={errors.role?.message} className="mt-2" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="password" className="text-black dark:text-white text-lg">
                        Пароль
                    </Label>
                    <Input id="password" type="password" placeholder="Пароль" {...register('password')} />
                    <FormError error={errors.password?.message} className="mt-2" />
                </div>
            </div>
            <DataTableModalFooter setIsOpenModal={setIsOpenUpdateModal} textButton="Сохранить" />
        </form>
    );
}
