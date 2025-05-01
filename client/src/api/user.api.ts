import { myFetch } from '@/api/main.api';
import { UpdateUser } from '@/types/user.interface';

export const getProfile = () => {
    return myFetch('/users/profile', {
        next: {
            revalidate: 30,
        },
    });
};

export const updateProfile = (data: UpdateUser) => {
    return myFetch('users/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};
