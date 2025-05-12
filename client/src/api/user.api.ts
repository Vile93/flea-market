import { myFetch } from '@/api/main.api';
import { setQuery } from '@/lib/set-query';
import { IQueryPanelTable } from '@/types/query.interface';
import { CreatePanelUser, UpdatePanelUser, UpdateProfileUser } from '@/types/user.interface';

export const getProfile = () => {
    return myFetch('/users/profile', {
        next: {
            revalidate: 30,
        },
    });
};

export const updateProfile = (data: UpdateProfileUser) => {
    return myFetch('users/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

export const getUsers = (query?: IQueryPanelTable) => {
    return myFetch(`/users${setQuery(query)}`);
};

export const deleteUser = (id: string) => {
    return myFetch(`/users/${id}`, {
        method: 'DELETE',
    });
};

export const createUser = (data: CreatePanelUser) => {
    return myFetch(`/users`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const updateUser = (data: UpdatePanelUser & { id: string }) => {
    return myFetch(`/users/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};
