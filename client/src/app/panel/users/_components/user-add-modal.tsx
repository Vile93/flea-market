'use client';

import { SelectGroup, SelectValue } from '@/components/ui/select';
import { SelectTrigger } from '@/components/ui/select';
import { SelectContent } from '@/components/ui/select';
import { Select } from '@/components/ui/select';
import { FormError } from '@/components/form-error';
import { SelectItem } from '@/components/ui/select';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Roles } from '@/types/roles.enum';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import DataTableModalFooter from '@/components/table/data-table-modal-footer';
import { toast } from 'sonner';
import { Dispatch, SetStateAction, useContext } from 'react';
import { useEffect } from 'react';
import { PanelReloadTableContext } from '@/contexts/panel-reload-table.context';
import { useFetch } from '@/hooks/use-fetch.hook';
import { IMessage } from '@/types/message.interface';
import { CreatePanelUser, User } from '@/types/user.interface';
import { userCreateSchema } from '@/validators/user.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUser } from '@/api/user.api';
import { PANEL_RELOAD_TABLE_REASON } from '@/constants/panel-reload-table-reason.constant';

interface UserAddModalProps {
    setIsOpenAddModal?: Dispatch<SetStateAction<boolean>>;
}

export default function UserAddModal({ setIsOpenAddModal }: UserAddModalProps) {
    const panelReloadTableContext = useContext(PanelReloadTableContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<CreatePanelUser>({
        resolver: zodResolver(userCreateSchema),
    });
    const createFetch = useFetch<IMessage | User, CreatePanelUser>(createUser);
    const onSubmit: SubmitHandler<CreatePanelUser> = (data) => {
        createFetch.setNewArgs([data]);
    };

    useEffect(() => {
        if (createFetch.newArgs) {
            createFetch.fetchData(true);
        }
    }, [createFetch.newArgs]);

    useEffect(() => {
        if (createFetch.isSuccessCompleted && createFetch.statusCode === 201) {
            toast.success('Пользователь успешно добавлен');
            setIsOpenAddModal?.(false);
            panelReloadTableContext?.reload(PANEL_RELOAD_TABLE_REASON.ADD);
        } else if (createFetch.isSuccessCompleted && createFetch.data && 'message' in createFetch.data) {
            toast.error(createFetch.data.message);
            setIsOpenAddModal?.(false);
            panelReloadTableContext?.reload();
        } else if (createFetch.isSuccessCompleted && createFetch.statusCode !== 201) {
            toast.error('Ошибка при добавлении пользователя');
            setIsOpenAddModal?.(false);
            panelReloadTableContext?.reload();
        }
    }, [createFetch.isSuccessCompleted]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 justify-between">
                    <div className="flex flex-col gap-2 flex-1/2">
                        <Label htmlFor="name" className="text-black dark:text-white text-lg">
                            Имя
                        </Label>
                        <Input id="name" type="text" placeholder="Имя" {...register('name')} />
                        <FormError error={errors.name?.message} className="mt-2" />
                    </div>
                    <div className="flex flex-col gap-2 flex-1/2">
                        <Label htmlFor="surname" className="text-black dark:text-white text-lg">
                            Фамилия
                        </Label>
                        <Input id="surname" type="text" placeholder="Фамилия" {...register('surname')} />
                        <FormError error={errors.surname?.message} className="mt-2" />
                    </div>
                </div>
                <div className="flex gap-2 justify-between">
                    <div className="flex flex-col gap-2 flex-1/2">
                        <Label htmlFor="username" className="text-black dark:text-white text-lg">
                            Логин
                        </Label>
                        <Input id="username" type="text" placeholder="Логин" {...register('username')} />
                        <FormError error={errors.username?.message} className="mt-2" />
                    </div>
                    <div className="flex flex-col gap-2 flex-1/2">
                        <Label htmlFor="phone" className="text-black dark:text-white text-lg">
                            Телефон
                        </Label>
                        <Input id="phone" type="tel" placeholder="Телефон" {...register('phone')} />
                        <FormError error={errors.phone?.message} className="mt-2" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="text-black dark:text-white text-lg">
                        Почта
                    </Label>
                    <Input id="email" type="email" placeholder="Почта" {...register('email')} />
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
                            render={({ field }) => (
                                <Select onValueChange={field.onChange}>
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
            <DataTableModalFooter setIsOpenModal={setIsOpenAddModal} textButton="Сохранить" />
        </form>
    );
}
