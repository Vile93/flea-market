import { myFetch } from '@/api/main.api';
import { setQuery } from '@/lib/set-query';
import { IQueryPanelTable } from '@/types/query.interface';
import { CreateRegion, UpdateRegion } from '@/types/region.interface';

const getRegions = async (query?: IQueryPanelTable) => {
    return myFetch(`/regions${setQuery(query)}`);
};

const deleteRegion = async (id: string) => {
    return myFetch(`/regions/${id}`, {
        method: 'DELETE',
    });
};

const createRegion = async (data: CreateRegion) => {
    return myFetch(`/regions`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

const updateRegion = async (data: UpdateRegion & { id: string }) => {
    return myFetch(`/regions/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

export { getRegions, deleteRegion, createRegion, updateRegion };
