import { myFetch } from '@/api/main.api';

export const getProfile = () => {
    return myFetch('/users/profile');
};
