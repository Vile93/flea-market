import { IQueryPanelTable } from '@/types/query.interface';
import { setQuery } from '@/lib/set-query';
import { myFetch } from '@/api/main.api';
import { CreateCategory, UpdateCategory } from '@/types/category.interface';

const getCategories = async (query?: IQueryPanelTable) => {
    return myFetch(`/categories${setQuery(query)}`);
};

const deleteCategory = async (id: string) => {
    return myFetch(`/categories/${id}`, {
        method: 'DELETE',
    });
};

const createCategory = async (data: CreateCategory) => {
    return myFetch(`/categories`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

const updateCategory = async (data: UpdateCategory & { id: string }) => {
    return myFetch(`/categories/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

export { getCategories, deleteCategory, createCategory, updateCategory };
