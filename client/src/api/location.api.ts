import { myFetch } from '@/api/main.api';
import { setQuery } from '@/lib/set-query';
import { CreateLocation, UpdateLocation } from '@/types/location.interface';
import { IQueryPanelTable } from '@/types/query.interface';

const getLocations = async (query?: IQueryPanelTable) => {
    return myFetch(`/locations${setQuery(query)}`);
};

const deleteLocation = async (id: string) => {
    return myFetch(`/locations/${id}`, {
        method: 'DELETE',
    });
};

const createLocation = async (data: CreateLocation) => {
    return myFetch(`/locations`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

const updateLocation = async (data: UpdateLocation & { id: string }) => {
    return myFetch(`/locations/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

export { getLocations, deleteLocation, createLocation, updateLocation };
