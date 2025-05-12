import { myFetch } from '@/api/main.api';
import { setQuery } from '@/lib/set-query';
import { IQueryPanelTable } from '@/types/query.interface';
import { CreateType, UpdateType } from '@/types/type.interface';

const getTypes = async (query?: IQueryPanelTable) => {
    return myFetch(`/types${setQuery(query)}`);
};

const deleteType = async (id: string) => {
    return myFetch(`/types/${id}`, {
        method: 'DELETE',
    });
};

const createType = async (data: CreateType) => {
    return myFetch(`/types`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

const updateType = async (data: UpdateType & { id: string }) => {
    return myFetch(`/types/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

export { getTypes, deleteType, createType, updateType };
